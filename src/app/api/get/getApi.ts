import { TMealsParams, TWelfaresParams } from "@/lib/types/meal";
import axios from "axios";

const getApi = axios.create({
  baseURL: "https://test-acg-playground.insahr.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

getApi.interceptors.request.use(
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

export const getMeals = ({ year, month }: TMealsParams) => getApi.get(`/users/meals`, { params: { year, month } });
export const getWelfares = ({ year, month }: TWelfaresParams) => getApi.get(`/users/welfares`, { params: { year, month } });
export const getActivities = ({ year, month }: TWelfaresParams) => getApi.get(`/users/activities`, { params: { year, month } });
export const getMe = () => getApi.get(`/users/me`);
export const getUsers = () => getApi.get(`/users/ids`);
export const getQnA = () => getApi.get(`/users/qna`);
export const getNotices = ({ pageNo, perPage }: { pageNo: number; perPage: number }) => getApi.get(`/users/notices`, { params: { pageNo, perPage } });
export const getNoticeDetail = ({ noticeIdx }: { noticeIdx: number }) => getApi.get(`/users/notices/${noticeIdx}`, { params: { noticeIdx: noticeIdx } });
export const getAllAttendance = ({ date }: { date: string }) => getApi.get(`/users/intranet/leave/all`, { params: { date: date } });

// 사용자 점심조 조회 API
export const getLunchGroup = () => getApi.get(`/users/playground/lunch-group`);
