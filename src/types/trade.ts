export type TradeOutcome = "Win" | "Loss" | "Not Taken";

export type TradeType = "Long" | "Short";

export interface ITrade {
  id: string;
  date: Date;
  tags: string[];
  image: string;
  signal: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value: number;
}

export interface IDashboardTrade {
  title: string;
  date: Date;
  pnl: string;
  outcome: TradeOutcome;
  type: string;
  entry: string;
  exit: string;
  tags?: string[];
  image?: string;
  signal?: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value?: number;
  tradeType?: TradeType;
}
