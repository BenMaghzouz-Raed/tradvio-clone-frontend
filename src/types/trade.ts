export type TradeType = "SWING" | "SCALP" | "BOTH";
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

export interface ITradeFilter {
  symbol?: string;
  source?: string;
  date_from?: Date;
  date_to?: Date;
}

export interface IRecordTrade {
  entry_price: number;
  entry_time: Date;
  exit_price: number;
  exit_time: Date;
  outcome: "WIN" | "LOSS";
  profit_loss: number;
  profit_percent: number;
  quantity: number;
  source: "MANUAL";
  symbol: string; //"EURUSD",
  trade_date: Date;
  trade_type: "LONG" | "SHORT";
  trading_notes: string;
}
