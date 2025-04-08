import { TActivityParams, TMealsParams, TWelfaresParams } from "@/lib/types/meal";
import { TApproval, TMyAttendance, TWorkHourStats, TYearMonth } from "@/types/apiTypes";
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
export const getWelfares = ({ year, halfYear }: TWelfaresParams) => getApi.get(`/users/welfares`, { params: { year, halfYear } });
export const getActivities = ({ year, halfYear }: TActivityParams) => getApi.get(`/users/activities`, { params: { year, halfYear } });
export const getMe = () => getApi.get(`/users/me`);
export const getUsers = () => getApi.get(`/users/ids`);
export const getQnA = () => getApi.get(`/users/qna`);
export const getNotices = ({ pageNo, perPage }: { pageNo: number; perPage: number }) => getApi.get(`/users/notices`, { params: { pageNo, perPage } });
export const getNoticeDetail = ({ noticeIdx }: { noticeIdx: number }) => getApi.get(`/users/notices/${noticeIdx}`, { params: { noticeIdx: noticeIdx } });
export const getAllAttendance = ({ date }: { date: string }) => getApi.get(`/users/intranet/leave/all`, { params: { date: date } });
// 사용자 개인 휴가관리 요약정보 조회 API 개발
export const getAttendanceSummary = ({ year }: { year: number }) => getApi.get(`/users/intranet/leave/stats`, { params: { year: year } });

// 사용자 점심조 조회 API
export const getLunchGroup = () => getApi.get(`/users/playground/lunch-group`);

// 개인 출퇴근 내역 조회 API

export const getMyAttendance = (params: TMyAttendance) => getApi.get(`/users/intranet/commute`, { params: params });

// 사용자 개인 휴가관리 상세정보 조회 API
export const getMyVacations = (params: TYearMonth) => getApi.get(`/users/intranet/leave/detail`, { params: params });

// 사용자 이번달 업무시간 조회(차트)

export const getWorkHourStats = (params: TWorkHourStats) => getApi.get(`/users/intranet/commute/work-hours`, { params: params });

// 사용자 개인 휴가관리 요약정보 조회 API 개발
export const getVacationSummary = ({ year }: { year: string }) => getApi.get(`/users/intranet/leave/stats`, { params: { year: year } });
// 사용자 개인 휴가관리 요약정보 조회 API 개발

// 결재 승인 내역 조회하기 API
export const getApprovals = (params: TApproval) => getApi.get(`/users/intranet/approval`, { params: params });

// 결재 승인 내역 조회하기 API
export const getBirth = ({ month }: { month: string }) => getApi.get(`/users/birth`, { params: { month: month } });

// 월별 전직원 휴가현황 조회 API
export const getAllAttendanceStaff = (params: TYearMonth) => getApi.get(`/users/intranet/leave/all/calender`, { params: params });
