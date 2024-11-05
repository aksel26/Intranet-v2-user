import { useQueryClient } from "@tanstack/react-query";

export const updateQueries = (key: string[]) => {
  console.log("🚀 ~ updateQueries ~ key:", key)
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: key });
};
