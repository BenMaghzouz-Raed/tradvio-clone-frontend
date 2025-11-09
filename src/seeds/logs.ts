import { ILog } from "@/types/log-type";
import { users } from "./users";

export const logs: ILog[] = [
  {
    log_id: "1",
    user_id: users[0].user_id,
    action: "DELETE",
    entity_type: "Trade",
    entity_id: "456",
    values: {
      trade_id: "456",
      direction: "Short",
      entry_price: 234.34,
      exit_price: 3455,
    },
    ip_address: "192.168.215.23",
    created_at: new Date(),
    user: users[0],
  },
  {
    log_id: "2",
    user_id: users[1].user_id,
    action: "POST",
    entity_type: "Trade",
    entity_id: "456",
    values: {
      trade_id: "456",
      direction: "Short",
      entry_price: 234.34,
      exit_price: 3455,
    },
    ip_address: "192.168.215.23",
    created_at: new Date(),
    user: users[1],
  },
  {
    log_id: "3",
    user_id: users[2].user_id,
    action: "PATCH",
    entity_type: "Trade",
    entity_id: "456",
    values: {
      trade_id: "456",
      direction: "Short",
      entry_price: 234.34,
      exit_price: 3455,
    },
    ip_address: "192.168.215.23",
    created_at: new Date(),
    user: users[2],
  },
  {
    log_id: "4",
    user_id: users[3].user_id,
    action: "DELETE",
    entity_type: "Trade",
    entity_id: "456",
    values: {
      trade_id: "456",
      direction: "Short",
      entry_price: 234.34,
      exit_price: 3455,
    },
    ip_address: "192.168.215.23",
    created_at: new Date(),
    user: users[3],
  },
];
