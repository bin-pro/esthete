import { getCookie } from "@/Cookie";
import axios from "axios";

const ACCESS_TOKEN = getCookie("accessToken");

export const Instance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
