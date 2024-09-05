import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";

export const setAccessToken = (token: string, expiresInDays: number = 7) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: expiresInDays });
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};
