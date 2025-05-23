import apiClient from "@/lib/axios";

// export const getMeals = () => jsonPlaceholderApi.get('/posts');

export const logout = () => apiClient.post(`/logout`);
export const submitForm = (values: any) => apiClient.post(`/users/qna`, values);

export const submitMeal = (values: any) => apiClient.post(`/users/meals`, values);
export const submitWelfare = (values: any) => apiClient.post(`/users/welfares`, values);
export const submitActivity = (values: any) => apiClient.post(`/users/activities`, values);
export const submitUpdateWelfare = (values: any) => apiClient.put(`/users/welfares/${values.queryParams}`, values.body);
export const submitUpdateActivity = (values: any) => apiClient.put(`/users/activities/${values.queryParams}`, values.body);

// 내 비밀번호 변경 API
export const changePassword = (values: any) => apiClient.patch(`/users/me/password`, values);
// 로그인한 사용자 기본정보 수정 API
export const changeMyInfo = (values: any) => apiClient.put(`/users/me`, values);

export const deleteMeal = (values: any) => apiClient.delete(`/users/meals/${values}`);
export const deleteWelfare = (values: any) => apiClient.delete(`/users/welfares/${values}`);
export const deleteActivity = (values: any) => apiClient.delete(`/users/activities/${values}`);
export const deleteQna = (values: any) => apiClient.delete(`/users/qna`, { data: values });

// 점심조 뽑기 API

export const assignLunchGroup = (values: any) => apiClient.post(`/users/playground/lunch-group`);

// 출근 찍기 API

export const checkIn = (values: any) => apiClient.post(`/users/intranet/check-in`, values);

export const checkOut = (values: any) => apiClient.put(`/users/intranet/check-out`, values);

export const leave = (values: any) =>
  apiClient.post(`/users/intranet/leave`, values, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// export const getWelfares = ({ year, month }: TWelfaresParams) => getApi.get(`/users/welfares`, { params: { year, month } });
// export const getActivities = ({ year, month }: TWelfaresParams) => getApi.get(`/users/activities`, { params: { year, month } });
// export const getMe = () => getApi.get(`/users/me`);
// export const getUsers = () => getApi.get(`/users/ids`);

// 사용자 개인 휴가 이미지 수정 API
export const leaveAttachment = (values: any) =>
  apiClient.patch(
    `/users/intranet/leave/${values.commuteIdx}/image`,
    { leaveImage: values.leaveImage },
    { headers: { "Content-Type": "multipart/form-data" } }
  );

// 사용자 개인 휴가 삭제 API

export const deleteVacation = (values: any) =>
  apiClient.delete(`/users/intranet/leave/${values.commuteIdx}`, {
    data: values,
  });

// 휴가 승인/반려하기 API
export const approveVacation = (values: any) =>
  apiClient.patch(`/users/intranet/approval/${values.commuteIdx}`, {
    confirmYN: values.confirmYN,
  });

// 사용자 먼슬리 음료 신청 API

export const updateDrink = (values: any) => apiClient.put(`/users/playground/monthly-baverage`, values);
