// sample trades data - expand/replace with your real API or DB data
const trades = [
  { id: 1, title: "TSLA", pnl: 200, outcome: "Win", tradeType: "Long", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 2, title: "Price Action Analysis Trade", pnl: 0, outcome: "Not Taken", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 3, title: "Price Action Analysis Trade", pnl: 200, outcome: "Win", tradeType: "Long", entry: 6881.61, exit: 6903.50, date: "Oct 28, 2025" },
  { id: 4, title: "Price Action Analysis Trade", pnl: 0, outcome: "Not Taken", tradeType: "Long", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 5, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 6881.61, exit: 6903.50, date: "Oct 28, 2025" },
  { id: 6, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 7, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 8, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 9, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },
  { id: 10, title: "Price Action Analysis Trade", pnl: -21.89, outcome: "Loss", tradeType: "Short", entry: 500.0, exit: 300.0, date: "Oct 28, 2025" },

  // add more rows to test pagination (duplicate entries for demo)
  { id: 11, title: "AAPL - Swing", pnl: 120.5, outcome: "Win", tradeType: "Long", entry: 145.0, exit: 150.5, date: "Oct 29, 2025" },
  { id: 12, title: "EURUSD Scalper", pnl: -35, outcome: "Loss", tradeType: "Short", entry: 1.1800, exit: 1.1835, date: "Oct 29, 2025" },
  { id: 13, title: "GBPUSD - News", pnl: 0, outcome: "Not Taken", tradeType: "Long", entry: 1.3000, exit: 1.2980, date: "Oct 30, 2025" },
  { id: 14, title: "TSLA Re-entry", pnl: 45.0, outcome: "Win", tradeType: "Long", entry: 700.0, exit: 745.0, date: "Oct 31, 2025" },
  { id: 15, title: "Short Setup", pnl: -10.0, outcome: "Loss", tradeType: "Short", entry: 300.0, exit: 310.0, date: "Nov 01, 2025" },
  { id: 16, title: "Long Trend", pnl: 300, outcome: "Win", tradeType: "Long", entry: 1000.0, exit: 1300.0, date: "Nov 02, 2025" },
  { id: 17, title: "Fade the Rally", pnl: -5, outcome: "Loss", tradeType: "Short", entry: 420.0, exit: 425.0, date: "Nov 03, 2025" },
  { id: 18, title: "Reversal Setup", pnl: 40, outcome: "Win", tradeType: "Long", entry: 80.0, exit: 120.0, date: "Nov 04, 2025" },
  { id: 19, title: "Breakout", pnl: 15, outcome: "Win", tradeType: "Long", entry: 33.0, exit: 48.0, date: "Nov 05, 2025" },
  { id: 20, title: "Mean Reversion", pnl: -2, outcome: "Loss", tradeType: "Short", entry: 12.0, exit: 12.5, date: "Nov 06, 2025" },
];

export default trades;
