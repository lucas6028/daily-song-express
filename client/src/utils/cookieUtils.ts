import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";

// Set access_token in cookie
export const setAccessToken = (token: string, expiresInDays: number = 7) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: expiresInDays });
};

// Get access_token from cookie
export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

// Remove access_token from cookie
export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};
