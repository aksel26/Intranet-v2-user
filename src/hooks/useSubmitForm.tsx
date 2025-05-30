"use client";

import { useMutation } from "@tanstack/react-query";
import * as api from "../app/api/post/postApi";

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitForm(values),
  });
};

export const useSubmitFormMeal = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitMeal(values),
  });
};

export const useSubmitFormWelfare = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitWelfare(values),
  });
};
export const useSubmitFormActivity = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitActivity(values),
  });
};
export const useUpdateFormWelfare = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitUpdateWelfare(values),
  });
};
export const useUpdateFormActivity = () => {
  return useMutation({
    mutationFn: (values: any) => api.submitUpdateActivity(values),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (values: any) => api.changePassword(values),
  });
};
export const useChangeMyInfo = () => {
  return useMutation({
    mutationFn: (values: any) => api.changeMyInfo(values),
  });
};

export const useDeleteMeals = () => {
  return useMutation({
    mutationFn: (values: any) => api.deleteMeal(values),
  });
};

export const useDeleteWelfares = () => {
  return useMutation({
    mutationFn: (values: any) => api.deleteWelfare(values),
  });
};
export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (values: any) => api.deleteActivity(values),
  });
};

export const useDeleteQna = () => {
  return useMutation({
    mutationFn: (values: any) => api.deleteQna(values),
  });
};

export const useAssignLunchGroup = () => {
  return useMutation({
    mutationFn: (values: any) => api.assignLunchGroup(values),
  });
};

export const useCheckIn = () => {
  return useMutation({
    mutationFn: (values: any) => api.checkIn(values),
  });
};

export const useCheckOut = () => {
  return useMutation({
    mutationFn: (values: any) => api.checkOut(values),
  });
};

export const useLeave = () => {
  return useMutation({
    mutationFn: (values: any) => api.leave(values),
  });
};

export const useUpdateAttachment = () => {
  return useMutation({
    mutationFn: (values: any) => api.leaveAttachment(values),
  });
};

export const useDeleteVacation = () => {
  return useMutation({
    mutationFn: (values: any) => api.deleteVacation(values),
  });
};

export const useApproveVacation = () => {
  return useMutation({
    mutationFn: (values: any) => api.approveVacation(values),
  });
};

export const useUpdateDrink = () => {
  return useMutation({
    mutationFn: (values: any) => api.updateDrink(values),
  });
};

export const useUpdateNew = () => {
  return useMutation({
    mutationFn: (values: any) => api.updateCheckNew(values),
  });
};
