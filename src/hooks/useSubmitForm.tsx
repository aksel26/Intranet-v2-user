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
