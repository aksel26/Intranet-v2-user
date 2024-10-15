import { TMealsParams } from "@/lib/types/meal";
import axios from "axios";

const mealApi = axios.create({
  baseURL: "https://test-acg-playground.insahr.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

mealApi.interceptors.request.use(
  (config) => {
    const userInfo = sessionStorage.getItem("token");
    console.log("🚀 ~ userInfo:", userInfo);
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

export const getMeals = ({ year, month }: TMealsParams) => mealApi.get(`/users/meals`, { params: { year, month } });
