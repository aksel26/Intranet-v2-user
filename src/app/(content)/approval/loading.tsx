import { Loader } from "@mantine/core";

// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-32">
      <Loader size={"sm"} />
    </div>
  );
}
