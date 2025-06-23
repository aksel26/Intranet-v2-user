// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthGuard } from './components/AuthGuard'
// import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from "./store/useAuthStore";
import { LoadingOverlay } from "@mantine/core";
import { AuthGuard } from "./components/auth/AuthGuard";
import Login from "./pages/login";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Main from "./pages/main";
import NotFound from "./pages/404";
// import Layout from "./components/global/layout";
import Approval from "./pages/approval";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import Layout from "./components/global/layout";
import Notice from "./pages/notice";
import NoticeDetails from "./components/notice/detail";
import MyInfo from "./pages/myInfo";
import Meal from "./pages/meal";
import Points from "./pages/points";

// import Login from './pages/Login'
// import Main from './pages/Main'
// import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated, isInitialized } = useAuthStore();

  return (
    <AuthGuard>
      <Routes>
        {/* 루트 경로 - 초기화 완료 후 로그인 상태에 따라 리다이렉트 */}
        <Route
          path="/"
          element={
            !isInitialized ? (
              <div className="min-h-screen flex items-center justify-center">
                <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
              </div>
            ) : isAuthenticated ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 로그인 페이지 - 초기화 완료 후 이미 로그인된 경우 메인으로 리다이렉트 */}
        <Route
          path="/login"
          element={
            !isInitialized ? (
              <div className="min-h-screen flex items-center justify-center">
                <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
              </div>
            ) : isAuthenticated ? (
              <Navigate to="/main" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* 보호된 메인 페이지 */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* 중첩 라우트들 */}
          <Route path="main" element={<Main />} />
          <Route path="approval" element={<Approval />} />
          <Route path="notice" element={<Notice />} />
          <Route path="notice/:id" element={<NoticeDetails />} />
          <Route path="myInfo" element={<MyInfo />} />
          <Route path="meal" element={<Meal />} />
          <Route path="points" element={<Points />} />
          {/* <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} /> */}

          {/* 서브 라우트 예시 */}
          {/* <Route path="users/:id" element={<UserDetail />} />
        <Route path="reports/monthly" element={<MonthlyReport />} />
        <Route path="reports/yearly" element={<YearlyReport />} /> */}
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthGuard>
  );
}

export default App;
