export type TradeType = "Short" | "Long";
export type TradeOutcome = "Win" | "Loss" | "Not Taken";
export type TradeSource = "AI" | "MANUAL";
export interface ITrade {
  trade_id?: string;
  user_id?: string;
  analysis_id?: string;
  source?: TradeSource;
  trade_date?: Date;
  symbol?: string;
  trade_type?: TradeType;
  // these are populated by the backend but not sent back
  // suggested_direction?: string;
  // suggested_entry_price?: string;
  // suggested_stop_loss?: string;
  // suggested_take_profit?: string;
  // suggested_risk_reward?: string;
  // suggested_position_size?: string;
  entry_time?: Date;
  entry_price?: number;
  exit_time?: Date;
  exit_price?: number;
  quantity?: number;
  outcome?: TradeOutcome;
  profit_loss?: number;
  profit_percent?: number;
  trading_notes?: string;
  review_notes?: string;
  created_at?: Date;
  updated_at?: Date;
}
