import { useMutation } from "@tanstack/react-query";
import React from "react";
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
