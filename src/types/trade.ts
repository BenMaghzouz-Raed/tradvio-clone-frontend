export type TradeOutcome = "Win" | "Loss" | "Not Taken";

export type TradeType = "Long" | "Short";

export interface ITrade {
  id?: string;
  title?: string;
  date?: Date;
  pnl?: number;
  outcome?: TradeOutcome;
  type?: TradeType;
  entry?: number;
  exit?: number;
  tags?: string[];
  image?: string;
  signal?: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value?: number;
}
