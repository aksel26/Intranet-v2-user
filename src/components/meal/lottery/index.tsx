import { mealService } from "@/api/services/meal/meal.services";
import { useApiMutation } from "@/api/useApi";
import { LOTTERY_EMOJI } from "@/lib/enums/lottery/emoji";
import { Box, Flex, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
// import ArrowRight from "/public/icons/arrow-right.svg";
// import { LOTTERY_EMOJI } from "@/lib/enums";
import "@/styles/lunch/lottery.css"; // Assuming you have a CSS file for styles
interface Paper extends HTMLDivElement {
  paperRef?: React.RefObject<HTMLDivElement>;
}

const LotteryComponent = ({ lotteryClose }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const papersRef = useRef<Paper[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<HTMLDivElement | null>(null);
  const [message, setMessage] = useState({ message: "화면을 클릭하여 추첨을 시작하세요!", status: "before" });
  const [isDone, setIsDone] = useState(false);

  const [messageStyle, setMessageStyle] = useState({
    bgColor: "bg-blue-100",
    textColor: "text-blue-500",
  });

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const value = sessionStorage.getItem("user");
    if (value) {
      const { userName } = JSON.parse(value);

      setUserName(userName);
    }
  }, []);

  const [isInitialized, setIsInitialized] = useState(false);

  //   const { mutate } = useAssignLunchGroup();

  const assign = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(mealService.assignLunchGroup);

  const queryClient = useQueryClient();

  const createPapers = () => {
    if (!containerRef.current || isInitialized) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    // 기존 papers 제거
    papersRef.current.forEach((paper) => paper.remove());
    papersRef.current = [];

    for (let i = 0; i < 30; i++) {
      const paper = document.createElement("div") as Paper;
      paper.className = "paper";
      paper.innerHTML = `
        <div class="front">${LOTTERY_EMOJI[i]}</div>
        <div class="back">${i + 1}</div>
      `;
      paper.paperRef = React.createRef<HTMLDivElement>();

      const randomX = Math.random() * (containerWidth - 60);
      const randomY = Math.random() * (containerHeight - 80);

      gsap.set(paper, {
        x: randomX,
        y: randomY,
        rotation: Math.random() * 360,
        zIndex: Math.floor(Math.random() * 50),
      });

      containerRef.current.appendChild(paper);
      papersRef.current.push(paper);
    }

    setIsInitialized(true);
  };

  const shufflePapers = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!containerRef.current) return;

      papersRef.current.forEach((paper) => {
        const delay = Math.random() * 0.2;

        gsap.to(paper, {
          x: Math.random() * (containerRef.current!.offsetWidth - 60),
          y: Math.random() * (containerRef.current!.offsetHeight - 80),
          rotation: Math.random() * 360,
          scale: 1,
          rotationY: 0,
          zIndex: Math.floor(Math.random() * 50),
          duration: 0.5,
          delay: delay,
          ease: "power1.inOut",
        });
      });

      setTimeout(resolve, 700);
    });
  };

  const selectPaper = (paper: HTMLDivElement): Promise<void> => {
    return new Promise((resolve) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const paperRect = paper.getBoundingClientRect();

      const centerX = containerRect.width / 2 - paperRect.width / 2;
      const centerY = containerRect.height / 2 - paperRect.height / 2;

      gsap.to(paper, {
        x: centerX,
        y: centerY,
        rotation: 0,
        scale: 1.5,
        rotationY: 180,
        zIndex: 100,
        duration: 0.6,
        ease: "back.out(1.7)",
        onComplete: resolve,
      });
    });
  };

  const startLottery = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMessageStyle({ bgColor: "bg-blue-100", textColor: "text-blue-500" });
    setMessage((prev) => ({ ...prev, message: "두근두근...", status: "processing" }));

    if (selectedPaper) {
      await new Promise((resolve) => {
        gsap.to(selectedPaper, {
          scale: 1,
          rotationY: 0,
          zIndex: 10,
          duration: 0.3,
          onComplete: resolve,
        });
      });
      setSelectedPaper(null);
    }

    let randomGroup;

    assign.mutate(null, {
      onSuccess: async (res: any) => {
        randomGroup = res.data.data.group;

        for (let i = 0; i < 3; i++) {
          await shufflePapers();
        }

        const newSelectedPaper = papersRef.current[randomGroup - 1];
        setSelectedPaper(newSelectedPaper);

        const backElement = newSelectedPaper.querySelector(".back") as HTMLDivElement;
        const selectedNumber = backElement?.textContent || "";

        await selectPaper(newSelectedPaper);

        setMessage((prev) => ({ ...prev, message: `${userName}님은 ${selectedNumber}조 입니다.`, status: "success" }));
        await queryClient.invalidateQueries({ queryKey: ["lunchGroup"] });

        setIsDone(true);
      },
      onError: (error: any) => {
        setMessage((prev) => ({ ...prev, message: error?.response?.data.message, status: "error" }));
      },
    });

    setIsAnimating(false);
  };

  const resetPapers = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    papersRef.current.forEach((paper) => {
      const randomX = Math.random() * (containerWidth - 60);
      const randomY = Math.random() * (containerHeight - 80);

      gsap.set(paper, {
        x: randomX,
        y: randomY,
        rotation: Math.random() * 360,
        rotationY: 0,
        zIndex: Math.floor(Math.random() * 50),
      });
    });

    setIsAnimating(false);
  };

  useEffect(() => {
    createPapers();
    return () => {
      papersRef.current.forEach((paper) => paper.remove());
    };
  }, []); // 의존성 배열을 비워서 한 번만 실행되도록 함

  return (
    <Flex direction={"column"} pt={"lg"} justify={"space-between"}>
      <Box ref={containerRef} onClick={startLottery} h={"calc(100svh - 280px)"} />
      <Text
        size="xl"
        ta={"center"}
        mt={"md"}
        fw={700}
        c={message.status === "error" ? "red.4" : undefined}
        variant={message.status === "before" || message.status === "processing" || message.status === "done" ? "gradient" : "text"}
        gradient={message.status === "before" || message.status === "processing" || message.status === "done" ? { from: "blue", to: "lime", deg: 90 } : undefined}
      >
        {message.message}
      </Text>
    </Flex>
  );
};

export default LotteryComponent;
