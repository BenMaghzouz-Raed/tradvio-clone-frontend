import { ITrade ,IDashboardTrade} from "@/types/trade";

export const TRADES: ITrade[] = [
  {
    id: "1",
    date: new Date(),
    image: "/images/graph.png",
    signal: "BUY",
    tags: ["Daily", "Bullish", "Ascending Triangle"],
    value: 29.0,
  },
  {
    id: "2",
    date: new Date(),
    image: "/images/graph.png",
    signal: "BUY",
    tags: ["Daily", "Bullish", "Ascending Triangle"],
    value: 29.0,
  },
  {
    id: "3",
    date: new Date(),
    image: "/images/graph.png",
    signal: "BUY",
    tags: ["Daily", "Bullish", "Ascending Triangle"],
    value: 29.0,
  },
  {
    id: "4",
    date: new Date(),
    image: "/images/graph.png",
    signal: "BUY",
    tags: ["Daily", "Bullish", "Ascending Triangle"],
    value: 29.0,
  },
  {
    id: "5",
    date: new Date(),
    image: "/images/graph.png",
    signal: "BUY",
    tags: ["Daily", "Bullish", "Ascending Triangle"],
    value: 29.0,
  },
];



export const dashboard_trades:IDashboardTrade[] = [
    {
      title: "TSLA",
      date: new Date(),
      pnl: "+2005$",
      outcome: "Win",
      type: "Swing",
      entry: "$500.00",
      exit: "$300.00",
    },
    {
      title: "Price Action Analysis Trade",
      date: new Date(),
      pnl: "0$",
      outcome: "Not Taken",
      type: "Swing",
      entry: "$500.00",
      exit: "$300.00",
    },
    {
      title: "Price Action Analysis Trade",
      date: new Date(),
      pnl: "+2005$",
      outcome: "Win",
      type: "Scalp",
      entry: "$6881.61",
      exit: "$6903.50",
    },
    {
      title: "Price Action Analysis Trade",
      date: new Date(),
      pnl: "0$",
      outcome: "Not Taken",
      type: "Swing",
      entry: "$500.00",
      exit: "$300.00",
    },
    {
      title: "Price Action Analysis Trade",
      date: new Date(),
      pnl: "-2189$",
      outcome: "Loss",
      type: "Scalp",
      entry: "$6881.61",
      exit: "$6903.50",
    },
  ];