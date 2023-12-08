import { getCookie } from "@/Cookie";
import axios from "axios";

const BASE_URL = "https://api.esthete.roberniro-projects.xyz/admin";

const ACCESS_TOKEN = getCookie("accessToken");

export const Instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
