import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

// Generic Query Hook
export function useApiQuery<T = any, P = any>(
  key: any[],
  fetcher: (params?: P) => Promise<T>,
  options?: any
) {
  return useQuery({
    queryKey: key,
    queryFn: () => {
      // key의 마지막 요소를 파라미터로 사용
      const params = key[key.length - 1];
      return fetcher(params);
    },
    ...options,
  });
}

// Generic Mutation Hook
export function useApiMutation<
  TData = any,
  TError = any,
  TVariables = void,
  TContext = unknown
>(
  fetcher: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  > & {
    invalidateKeys?: any[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: fetcher,
    onSuccess: async (data, variables, context) => {
      // invalidateKeys 처리
      if (options?.invalidateKeys) {
        await Promise.all(
          options.invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          )
        );
      }
      // 사용자 정의 onSuccess 실행
      await options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
    ...options,
  });
}
