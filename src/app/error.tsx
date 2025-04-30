// app/error.js - 전역 에러 페이지
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: any) {
  useEffect(() => {
    // 에러를 서버로 보고하는 로직을 추가할 수 있습니다
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">문제가 발생했습니다</h1>
      <p className="text-lg mb-6">서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => reset()}>
          다시 시도
        </button>
        <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

// app/network-error/page.js - 네트워크 에러 페이지
export function NetworkErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">네트워크 오류</h1>
      <p className="text-lg mb-6">서버와 통신 중 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// app/forbidden/page.js - 접근 권한 오류 페이지
export function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">접근 권한 없음</h1>
      <p className="text-lg mb-6">이 페이지에 접근할 권한이 없습니다.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
