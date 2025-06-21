export const ENDPOINTS = {
  // User endpoints
  USERS: "/users/ids",
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_ME: "/users/me",

  // // 내 비밀번호 변경 API
  // export const changePassword = (values: any) => apiClient.patch(`/users/me/password`, values);
  // // 로그인한 사용자 기본정보 수정 API
  // export const changeMyInfo = (values: any) => apiClient.put(`/users/me`, values);

  // Post endpoints
  // POSTS: "/posts",
  // POST_BY_ID: (id: string) => `/posts/${id}`,

  // // Comment endpoints
  // COMMENTS: "/comments",
  // POST_COMMENTS: (postId: string) => `/posts/${postId}/comments`,
} as const;
