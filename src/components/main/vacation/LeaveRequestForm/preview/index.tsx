import { Button, Group, Image, Loader, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
// import NextImage from "next/image";
function AttachmentPreview({ opened, close, file }: any) {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    // 이미지 파일 형식 확인
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 미리보기가 가능합니다.");
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      } else {
        setError("이미지를 읽을 수 없습니다.");
      }
      setLoading(false);
    };

    reader.onerror = () => {
      setError("이미지를 읽는 중 오류가 발생했습니다.");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  }, [file]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="첨부파일"
      centered
      size={"md"}
    >
      <div style={{ marginBottom: "1rem" }}>
        {file && (
          <Text size="sm" fw={500}>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </Text>
        )}
      </div>

      {loading ? (
        <Group justify="center" py="xl">
          <Loader size="lg" />
        </Group>
      ) : error ? (
        <Text c="red" ta="center" py="xl">
          {error}
        </Text>
      ) : preview ? (
        <div style={{ position: "relative", width: "100%", height: "300px" }}>
          <Image
            src={preview}
            alt="첨부 이미지"
            style={{ objectFit: "contain" }}
            className="transition-all duration-200"
          />
        </div>
      ) : (
        <Text ta="center" py="xl">
          미리보기를 사용할 수 없습니다.
        </Text>
      )}

      <Button variant="light" color="gray" onClick={close} fullWidth mt={"md"}>
        닫기
      </Button>
    </Modal>
  );
}

export default AttachmentPreview;
