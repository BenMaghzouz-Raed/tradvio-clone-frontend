import { UserRoleType } from "./user-types";

export interface RouteType {
  path: string;
  title: string | undefined;
  authenticated: boolean;
  role: UserRoleType | undefined;
}
