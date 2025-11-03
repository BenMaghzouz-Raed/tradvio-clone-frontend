export interface ITrade {
  id: string;
  date: Date;
  tags: string[];
  image: string;
  signal: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value: number;
}
