import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트에서 즉시 refetch하는 것을 피하기 위해
        // staleTime을 0보다 크게 설정하는 것이 좋다.
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server일 경우
    // 매번 새로운 queryClient를 만든다.
    return makeQueryClient();
  } else {
    // Browser일 경우
    // queryClient가 존재하지 않을 경우에만 새로운 queryClient를 만든다.
    // React가 새 Client를 만들게 하기 위해 중요하다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
