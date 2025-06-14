// import apiClient from "@/lib/axios/client-api";
import apiClient from "@/lib/axios/client-api";
import {
  TActivityParams,
  TMealsParams,
  TWelfaresParams,
} from "@/lib/types/meal";
import {
  TApproval,
  TMyAttendance,
  TSearchNotice,
  TWorkHourStats,
  TYearMonth,
} from "@/types/apiTypes";
import axios from "axios";

// export const getMeals = () => jsonPlaceholderApi.get('/posts');

// export const getMeals = ({ year, month }: TMealsParams) => apiClient.get(`/users/meals`, { params: { year, month } });
export const getMeals = ({ year, month }: TMealsParams) =>
  apiClient.get(`/users/meals`, { params: { year, month } });
export const getWelfares = ({ year, halfYear }: TWelfaresParams) =>
  apiClient.get(`/users/welfares`, { params: { year, halfYear } });
export const getActivities = ({ year, halfYear }: TActivityParams) =>
  apiClient.get(`/users/activities`, { params: { year, halfYear } });
export const getMe = () => apiClient.get(`/users/me`);
export const getUsers = () => apiClient.get(`/users/ids`);
export const getQnA = () => apiClient.get(`/users/qna`);
export const getNotices = (params: any) =>
  apiClient.get(`/users/notices`, { params: params });
export const getNoticeDetail = ({ noticeIdx }: { noticeIdx: number }) =>
  apiClient.get(`/users/notices/${noticeIdx}`, {
    params: { noticeIdx: noticeIdx },
  });

// 사용자 점심조 조회 API
export const getLunchGroup = () =>
  apiClient.get(`/users/playground/lunch-group`);

// 개인 출퇴근 내역 조회 API

export const getMyAttendance = (params: TMyAttendance) =>
  apiClient.get(`/users/intranet/commute`, { params: params });

// 사용자 개인 휴가관리 상세정보 조회 API
export const getMyVacations = (params: TYearMonth) =>
  apiClient.get(`/users/intranet/leave/detail`, { params: params });

// 사용자 이번달 업무시간 조회(차트)

export const getWorkHourStats = (params: TWorkHourStats) =>
  apiClient.get(`/users/intranet/commute/work-hours`, { params: params });

// 사용자 개인 휴가관리 요약정보 조회 API 개발
export const getVacationSummary = ({ year }: { year: string }) =>
  apiClient.get(`/users/intranet/leave/stats`, { params: { year: year } });
// 사용자 개인 휴가관리 요약정보 조회 API 개발

// 결재 승인 내역 조회하기 API
export const getApprovals = (params: TApproval) =>
  apiClient.get(`/users/intranet/approval`, { params: params });

// 결재 승인 내역 조회하기 API
export const getBirth = ({ month }: { month: string }) =>
  apiClient.get(`/users/birth`, { params: { month: month } });

// 월별 전직원 휴가현황 조회 API
export const getAllAttendanceStaff = (params: TYearMonth) =>
  apiClient.get(`/users/intranet/leave/all/calender`, { params: params });

// 사용자 공지사항 목록 조회 API
export const searchNotice = (params: TSearchNotice) =>
  apiClient.get(`/users/notices`, { params: params });

// 사용자 먼슬리 음료 현황 API
export const monthlyDrink = ({ month }: { month: string }) =>
  apiClient.get(`/users/playground/monthly-baverage`, {
    params: { month: month },
  });

// 사용자 결제승인 NEW 존재 확인 API
export const approvalHasNew = () =>
  apiClient.get(`/users/intranet/approval/has-new`);

// 사용자 공지사항 NEW 존재 확인 API

export const noticeHasNew = () => apiClient.get(`/users/notices/has-new`);

// 월별 주말 및 공휴일 날짜 조회 API

export const getHolidays = (params: TYearMonth) =>
  apiClient.get(`/users/intranet/holiday`, { params: params });
