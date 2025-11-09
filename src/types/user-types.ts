export type UserRole = "admin" | "user";

export type UserStatus = "active" | "suspended" | "deleted";

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  timezone: string;
  role: UserRole;
  status: UserStatus;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
}
