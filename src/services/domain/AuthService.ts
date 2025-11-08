import { getOrThrow } from "@/config";
import http from "@/lib/http";
import { RegisterUserType } from "@/types/auth-types";

export const register = (user: RegisterUserType) => {
  return http.post("/auth/register", user);
};

export const confirmEmail = ({
  selector,
  token,
}: {
  selector: string;
  token: string;
}) => {
  return http.get(
    `/auth/verify-email/confirm?selector=${selector}&token=${token}`
  );
};

export const login = async (data: { username: string; password: string }) => {
  return http.post("/auth/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const refresh = async () => {
  const response = await http.post(
    "/auth/refresh",
    {},
    { withCredentials: true }
  );
  localStorage.setItem(
    getOrThrow<string>("ACCESS_TOKEN_TAG") || "access_token",
    response.data["access_token"]
  );
};

export const logout = async () => {
  await http.post("/auth/logout");
};

export const getCurrentUser = () => {
  return http.get("/auth/me");
};

export const changePassword = (data: {
  current_password: string;
  new_password: string;
}) => {
  return http.post("/auth/change-password", data);
};

export const updateCurrentUser = (data: {
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string;
  timezone: string;
}) => {
  return http.post("/auth/change-me", data);
};

export const forgotPassword = (data: { email: string }) => {
  return http.post("/auth/forgot-password", data);
};

export const resetPasswordVerify = ({
  selector,
  token,
}: {
  selector: string;
  token: string;
}) => {
  return http.get(
    `/auth/reset-password/verify?selector=${selector}&token=${token}`
  );
};

export const resetPassword = (data: {
  selector: string;
  token: string;
  new_password: string;
}) => {
  return http.post("/auth/reset-password", data);
};
