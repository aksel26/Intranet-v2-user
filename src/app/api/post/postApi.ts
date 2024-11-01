import { TMealsParams, TWelfaresParams } from "@/lib/types/meal";
import axios from "axios";

const postApi = axios.create({
  baseURL: "https://test-acg-playground.insahr.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

postApi.interceptors.request.use(
  (config) => {
    const userInfo = sessionStorage.getItem("token");
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

// export const getWelfares = ({ year, month }: TWelfaresParams) => getApi.get(`/users/welfares`, { params: { year, month } });
// export const getActivities = ({ year, month }: TWelfaresParams) => getApi.get(`/users/activities`, { params: { year, month } });
// export const getMe = () => getApi.get(`/users/me`);
// export const getUsers = () => getApi.get(`/users/ids`);
