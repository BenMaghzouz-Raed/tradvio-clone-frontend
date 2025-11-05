export interface ITrade {
  id: string;
  date: Date;
  tags?: string[];
  image?: string;
  signal?: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value?: number;
  title?: string;
  pnl?: number;
  outcome?: "Win" | "Loss" | "Not Taken";
  tradeType?: "Long" | "Short";
  entry?: number;
  exit?: number;
}
