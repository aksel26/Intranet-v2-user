import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Generic Query Hook
export function useApiQuery<T = any>(
  key: any[],
  fetcher: () => Promise<T>,
  options?: any
) {
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    ...options,
  });
}

// Generic Mutation Hook
export function useApiMutation<T = any, V = any>(
  fetcher: (variables: V) => Promise<T>,
  options?: any
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (data, variables, context) => {
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key: any[]) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
