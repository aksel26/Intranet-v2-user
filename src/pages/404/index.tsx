// src/pages/NotFound.tsx
import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Container size="md" ta="center">
        <div className="text-8xl mb-4">🔍</div>
        <Title className="mb-4 text-6xl font-bold text-gray-800">404</Title>
        <Title order={2} className="mb-4 text-2xl text-gray-600">
          페이지를 찾을 수 없습니다
        </Title>
        <Text size="lg" c="dimmed" className="mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Text>
        <Button size="lg" onClick={() => navigate("/", { replace: true })}>
          홈으로 돌아가기
        </Button>
      </Container>
    </div>
  );
}
