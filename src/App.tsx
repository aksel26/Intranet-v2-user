import { Routes, Route, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import "./App.css";
import NotFound from "./pages/404";
import { useAuthStore } from "./store/useAuthStore";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Main from "./pages/main";
import Login from "./pages/login";
// import Login from "./pages/login";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* 루트 경로 - 로그인 상태에 따라 리다이렉트 */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/main" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 로그인 페이지 - 이미 로그인된 경우 메인으로 리다이렉트 */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/main" replace /> : <Login />}
      />

      {/* 보호된 메인 페이지 */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />

      {/* 404 페이지 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
