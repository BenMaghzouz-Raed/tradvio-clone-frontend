import { IUser } from "./user-types";

// Backend emits many actions (e.g., STARTED, COMPLETED, ANALYZE_FAILED, DB_ERROR, POST, DELETE, PATCH, etc.)
export type LogAction = string;

// TODO: add entity type as type
export interface ILog {
  log_id: string;
  user_id?: string;
  action: LogAction;
  entity_type?: string;
  entity_id?: string;
  values?: any;
  ip_address?: string;
  created_at: string | Date;
  user?: IUser;
}
