export type UserRoleType = "admin" | "user";

export type UserStatus = "active" | "suspended" | "deleted";

export type UserType = {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  timezone: string;
  role: UserRoleType;
  status: UserStatus;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
};
