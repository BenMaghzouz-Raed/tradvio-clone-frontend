export interface ITrade {
  id: string;
  date: Date;
  tags: string[];
  image: string;
  signal: string; // TODO: change to possible values only ("BUY"|"SELL" etc)
  value: number;
  
}


export interface IDashboardTrade {
 title: string,
      date: Date,
      pnl: string,
      outcome: string,
      type: string,
      entry: string,
      exit: string,
  
}
