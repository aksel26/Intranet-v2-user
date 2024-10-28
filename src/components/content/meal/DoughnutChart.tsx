import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// 필요한 차트 요소를 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = dynamic(() => import("react-chartjs-2").then((mod) => mod.Doughnut), {
  ssr: false, // 서버사이드 렌더링 비활성화
});

const ChartComponent = ({ stats }: any) => {
  const { budget, expenses, balance } = stats;

  const pathname = usePathname();

  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);

  const remainingAmount = budget - expenses;

  const data = {
    labels: ["사용한 금액", "잔여 금액"],

    datasets: [
      {
        data: [expenses, remainingAmount],
        backgroundColor: ["#005b99", "#cedde9"], // 메인 컬러, 서브 컬러(회색)
        borderWidth: 0, // 테두리 제거
        borderRadius: 10, // 모서리 둥글게
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // 도넛 차트의 중앙 구멍 크기
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        // enabled: false,
      },
    },
    animation: {
      duration: 1500, // 애니메이션 지속 시간을 2초로 설정
    },
  };

  useEffect(() => {
    // 차트 인스턴스 초기화
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [pathname]);

  return (
    <DoughnutChart
      data={data}
      ref={chartRef}
      options={options}
      key={pathname} // 라우트가 변경될 때마다 새로운 key 값
    />
  );
};

export default ChartComponent;
