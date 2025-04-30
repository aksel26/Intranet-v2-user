"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <h2 className="text-2xl font-bold mb-4">애플리케이션 오류</h2>
          <p className="mb-4 text-gray-600">{error.message || "심각한 오류가 발생했습니다."}</p>
          <button onClick={() => reset()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
