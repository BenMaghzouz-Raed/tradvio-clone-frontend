export interface ITrade {
  id: string;
  date: Date;
  tags?: string[];
  image?: string;
  signal?: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value?: number;
  title?: string;
  pnl?: number;
  outcome?: TradeOutcome;
  tradeType?: TradeType;
  entry?: number;
  exit?: number;
}

export type TradeOutcome = "Win" | "Loss" | "Not Taken";

export type TradeType = "Long" | "Short";
