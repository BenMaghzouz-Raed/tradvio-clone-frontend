export type UserRoleType = "admin" | "user";

export type UserType = {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  timezone: string;
  role: string;
  status: string;
  email_verified: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
};
