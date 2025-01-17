import axios from "axios";

const postApi = axios.create({
  baseURL: "https://test-acg-playground.insahr.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

postApi.interceptors.request.use(
  (config) => {
    const userInfo = sessionStorage.getItem("user");
    const token = userInfo ? JSON.parse(userInfo).accessToken : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const getMeals = () => jsonPlaceholderApi.get('/posts');

export const logout = () => postApi.post(`/logout`);
export const submitForm = (values: any) => postApi.post(`/users/qna`, values);

export const submitMeal = (values: any) => postApi.post(`/users/meals`, values);
export const submitWelfare = (values: any) =>
  postApi.post(`/users/welfares`, values);
export const submitActivity = (values: any) =>
  postApi.post(`/users/activities`, values);
export const submitUpdateWelfare = (values: any) =>
  postApi.put(`/users/welfares/${values.queryParams}`, values.body);
export const submitUpdateActivity = (values: any) =>
  postApi.put(`/users/activities/${values.queryParams}`, values.body);

// 내 비밀번호 변경 API
export const changePassword = (values: any) =>
  postApi.patch(`/users/me/password`, values);
// 로그인한 사용자 기본정보 수정 API
export const changeMyInfo = (values: any) => postApi.put(`/users/me`, values);

export const deleteMeal = (values: any) =>
  postApi.delete(`/users/meals/${values}`);
export const deleteWelfare = (values: any) =>
  postApi.delete(`/users/welfares/${values}`);
export const deleteActivity = (values: any) =>
  postApi.delete(`/users/activities/${values}`);
export const deleteQna = (values: any) =>
  postApi.delete(`/users/qna`, { data: values });

// 점심조 뽑기 API

export const assignLunchGroup = (values: any) =>
  postApi.post(`/users/playground/lunch-group`);

// 출근 찍기 API

export const checkIn = (values: any) =>
  postApi.post(`/users/intranet/check-in`, values);

export const checkOut = (values: any) =>
  postApi.put(`/users/intranet/check-out`, values);

// export const getWelfares = ({ year, month }: TWelfaresParams) => getApi.get(`/users/welfares`, { params: { year, month } });
// export const getActivities = ({ year, month }: TWelfaresParams) => getApi.get(`/users/activities`, { params: { year, month } });
// export const getMe = () => getApi.get(`/users/me`);
// export const getUsers = () => getApi.get(`/users/ids`);
