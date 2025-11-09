import { UserRole } from "./user-types";

export interface RouteType {
  path: string;
  title: string | undefined;
  protected: boolean;
  roles: UserRole[];
}
