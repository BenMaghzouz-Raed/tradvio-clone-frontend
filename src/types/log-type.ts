import { IUser } from "./user-types";

export type LogAction = "POST" | "DELETE" | "PATCH"; // TOOD: check if this is correct

// TODO: add entity type as type
export interface ILog {
  log_id: string;
  user_id: string;
  action: LogAction;
  entity_type: string;
  entity_id: string;
  values: object;
  ip_address: string;
  created_at: Date;
  user?: IUser;
}
