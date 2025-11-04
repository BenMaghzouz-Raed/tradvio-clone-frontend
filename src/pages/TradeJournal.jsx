"use client";

import { useState } from "react";
import PaginationComponent from "../components/pagination";
import tradesData from "../seeds/trades.ts";
import StatsCard from "../components/stats-card";
import TradeTable from "../components/trade-table";
import Filter from "../components/icons/filter"; 

function TradeJournal() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tradesData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = tradesData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard label="Total P&L" value="$178.11" />
        <StatsCard label="Win Rate" value="50%" />
        <StatsCard label="Avg. Win" value="$200.00" />
        <StatsCard label="Avg. Loss" value="$21.89" />
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center gap-3" >
          <button className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
            <span>Filter</span>
            <Filter className="w-5 h-5" />
          </button>

          <button className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800">
            Record New Trade
          </button>
        </div>
      </div>


      {/* Table */}
      <TradeTable trades={currentRows} />

      {/* Pagination */}
      <div className="mt-6 w-full flex justify-end">
        <div className="w-fit">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default TradeJournal;
