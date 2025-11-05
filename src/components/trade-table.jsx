import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tag from "@/components/tag"; 

function TradeTable({ trades = [] }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="text-gray-600 text-sm">
            <TableHead>Title</TableHead>
            <TableHead>P&amp;L</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Trade Type</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Exit Price</TableHead>
            <TableHead>•••</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="p-6 text-center text-gray-500"
              >
                No trades found.
              </TableCell>
            </TableRow>
          ) : (
            trades.map((trade) => (
              <TableRow
                key={trade.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {/* Title */}
                <TableCell className="p-3 align-top">
                  <div className="font-semibold text-sm">{trade.title}</div>
                  <div className="text-xs text-gray-400">{trade.date}</div>
                </TableCell>

                {/* P&L */}
                <TableCell className="p-3 align-top">
                  <Tag
                    label={
                      trade.pnl > 0
                        ? `+$${trade.pnl.toFixed(2)}`
                        : `$${trade.pnl.toFixed(2)}`
                    }
                    variant={
                      trade.pnl > 0
                        ? "success"
                        : trade.pnl < 0
                        ? "error"
                        : "neutral"
                    }
                  />
                </TableCell>

                {/* Outcome */}
                <TableCell className="p-3 align-top">
                  <Tag
                    label={trade.outcome}
                    variant={
                      trade.outcome === "Win"
                        ? "success"
                        : trade.outcome === "Loss"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>

                {/* Trade Type */}
                <TableCell className="p-3 align-top text-sm">
                  <Tag label={trade.tradeType} variant="neutral" />
                </TableCell>

                {/* Entry / Exit */}
                <TableCell className="p-3 align-top text-sm">
                  ${trade.entry.toLocaleString()}
                </TableCell>
                <TableCell className="p-3 align-top text-sm">
                  ${trade.exit.toLocaleString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="p-3 align-top text-sm">
                  <button className="text-gray-400 hover:text-gray-600">⋯</button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TradeTable;
