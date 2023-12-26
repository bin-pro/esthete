import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option: object) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option: object) => {
  return cookies.remove(name, { ...option });
};

export const removeAllCookies = () => {
  const cookiesList = cookies.getAll();
  Object.keys(cookiesList).forEach((cookie) => {
    cookies.remove(cookie);
  });
};
