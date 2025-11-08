import { UserRoleType } from "./user-types";

export interface RouteType {
  path: string;
  title: string | undefined;
  protected: boolean;
  roles: UserRoleType[];
}
