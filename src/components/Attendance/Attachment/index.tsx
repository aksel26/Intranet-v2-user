import React, { useEffect, useState } from "react";
import { Button, FileButton, Group, Image, Modal, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import { useUpdateAttachment } from "@/hooks/useSubmitForm";
import { IconUpload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import notification from "@/components/GNB/Notification";

const Attachment = ({ opened, close, details }: any) => {
  const { mutate } = useUpdateAttachment();
  const [file, setFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<any>(details?.imageUrl);

  const queryClient = useQueryClient();

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
    setFile(file);
  };

  const handleSave = () => {
    mutate(
      {
        commuteIdx: details?.commuteIdx,
        leaveImage: file,
      },
      {
        onSuccess: (res: any) => {
          close();
          queryClient.invalidateQueries({ queryKey: ["vacationAll"] });
          notification({
            color: "green",
            title: "첨부파일",
            message: "첨부파일이 저장되었습니다.",
          });
        },
        onError: (error: any) => {
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            title: "첨부파일",
            message: err,
          });
        },
      }
    );
  };

  useEffect(() => {
    setImagePreview(details?.imageUrl);
  }, [details]);

  return (
    <Modal opened={opened} onClose={close} title="첨부파일" centered size={"md"}>
      {imagePreview ? (
        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => (
            <div className="min-h-48 h-full relative flex items-center justify-center group  hover:bg-slate-300 transition-all duration-200 ease-in-out rounded-lg overflow-hidden cursor-pointer">
              <NextImage {...props} src={imagePreview} alt="Uploaded image" fill className="group-hover:brightness-50 transition-all duration-200" />
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 justify-center items-center flex flex-col">
                <IconUpload color="white" />
                <Text fz={"sm"} mt={"sm"} c={"white"}>
                  이미지 업로드
                </Text>
              </div>
            </div>
          )}
        </FileButton>
      ) : (
        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => (
            <div
              {...props}
              style={{
                width: 300,
                height: 300,
                border: "2px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              이미지를 클릭하여 업로드
            </div>
          )}
        </FileButton>
      )}

      <Group wrap="nowrap" mt={"md"}>
        <Button variant="light" size="sm" fullWidth onClick={handleSave}>
          저장하기
        </Button>
        <Button variant="light" color="gray" fullWidth onClick={close}>
          닫기
        </Button>
      </Group>
    </Modal>
  );
};

export default Attachment;
