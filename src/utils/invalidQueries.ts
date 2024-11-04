import { useQueryClient } from "@tanstack/react-query";

export const updateQueries = (key: string[]) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: key });
};
