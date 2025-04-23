import React, { useCallback, useEffect, useState } from "react";
import { Button, FileButton, Group, Image, Modal, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import { useUpdateAttachment } from "@/hooks/useSubmitForm";
// import { IconUpload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import notification from "@/components/GNB/Notification";
import { IconDownload, IconPhotoScan, IconUpload, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Attachment = ({ opened, close, details }: any) => {
  const { mutate } = useUpdateAttachment();
  const [file, setFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<any>(details?.imageUrl);

  const queryClient = useQueryClient();

  const [deleteConfirmOpened, { open: deleteConfirmOpen, close: deleteConfirmClose }] = useDisclosure(false);

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
          setFile(null);
        },
        onError: (error: any) => {
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            title: "첨부파일",
            message: err,
          });
          setFile(null);
        },
      }
    );
  };

  const deleteImage = () => {
    mutate(
      {
        commuteIdx: details?.commuteIdx,
        leaveImage: null,
      },
      {
        onSuccess: (res: any) => {
          close();
          queryClient.invalidateQueries({ queryKey: ["vacationAll"] });
          notification({
            color: "green",
            title: "첨부파일",
            message: "첨부파일이 삭제되었습니다.",
          });
          setFile(null);
          deleteConfirmClose();
        },
        onError: (error: any) => {
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            title: "첨부파일",
            message: err,
          });
          deleteConfirmClose();
        },
      }
    );
  };

  useEffect(() => {
    setImagePreview(details?.imageUrl);
  }, [details]);

  const downloadImage = useCallback(async (imageUrl: string, imageName: string) => {
    try {
      // For external URLs, fetch the image first
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = imageName || "image";

      // Programmatically click the link to trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }, []);

  const handleClose = () => {
    setImagePreview(details?.imageUrl);
    setFile(null);
    close();
  };

  const ButtonBranch = () => {
    if ((file && imagePreview) || (!file && !imagePreview)) {
      return (
        <>
          <Button
            variant="light"
            size="sm"
            fullWidth
            onClick={handleSave}
            disabled={!file ? true : false}
            leftSection={<IconUpload size={20} strokeWidth={1.5} />}
          >
            업로드
          </Button>
          <Button variant="light" color="gray" fullWidth onClick={close}>
            닫기
          </Button>
        </>
      );
    } else if (!file && imagePreview) {
      return (
        <>
          <Button
            leftSection={<IconDownload size={20} strokeWidth={1.5} />}
            variant="light"
            size="sm"
            fullWidth
            onClick={() => downloadImage(details?.imageUrl, details?.imageName)}
          >
            {details.imageName}
          </Button>
          <Button fullWidth size="sm" variant="light" color="red" leftSection={<IconX size={18} strokeWidth={1.2} />} onClick={deleteConfirmOpen}>
            삭제하기
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="첨부파일" centered size={"md"}>
      {imagePreview ? (
        <Stack>
          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
            {(props) => (
              <div className="relative w-full h-[300px] flex items-center justify-center group  transition-all duration-200 ease-in-out rounded-lg overflow-hidden cursor-pointer">
                <div>
                  <NextImage
                    {...props}
                    src={imagePreview}
                    alt="Uploaded image"
                    fill
                    style={{ objectFit: "contain" }}
                    className="group-hover:brightness-50 transition-all duration-200"
                  />
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 justify-center items-center flex flex-col">
                  <IconPhotoScan color="white" size={30} />
                  <Text fz={"sm"} mt={"sm"} c={"white"}>
                    이미지 업로드
                  </Text>
                </div>
              </div>
            )}
          </FileButton>
          <Text c={"dimmed"} fz={"xs"}>
            이미지를 변경하려면 이미지를 클릭하세요.
          </Text>
        </Stack>
      ) : (
        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => (
            <div
              {...props}
              style={{
                height: 300,
                border: "1px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Stack gap={4} align="center">
                <IconPhotoScan color="gray" size={30} />
                <Text fz={"xs"} c={"dimmed"}>
                  파일 선택 버튼을 눌러 파일을 선택해 주세요.
                </Text>
                <Text fz={"xs"} c={"dimmed"}>
                  파일 1개당 크기는 10MB를 초과할 수 없습니다.
                </Text>
                <Text fz={"xs"} c={"dimmed"}>
                  가능한 파일 형식 : png, jpg, jpeg
                </Text>
              </Stack>
            </div>
          )}
        </FileButton>
      )}
      <Group wrap="nowrap" mt={"md"}>
        {ButtonBranch()}
      </Group>

      <Modal opened={deleteConfirmOpened} onClose={deleteConfirmClose} title="삭제 확인" centered size={"sm"}>
        <Text fz={"sm"}>정말로 삭제하시겠습니까?</Text>
        <Text fz={"xs"} c={"dimmed"} mt={"xs"}>
          삭제된 이미지는 복구할 수 없습니다.
        </Text>
        <Group mt={"md"} wrap="nowrap">
          <Button fullWidth variant="light" color="gray" onClick={deleteConfirmClose}>
            취소
          </Button>
          <Button fullWidth variant="light" color="red" onClick={deleteImage}>
            삭제하기
          </Button>
        </Group>
      </Modal>
    </Modal>
  );
};

export default Attachment;
