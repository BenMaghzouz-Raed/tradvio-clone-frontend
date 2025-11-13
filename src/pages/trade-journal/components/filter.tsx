import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ITradeFilter } from "@/types/trade";
import { ChevronDownIcon, SlidersVertical } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const allTradeSymbols = ["All", "symbol-1", "symbol-2", "symbol-3"];

export default function Filter({
  filters = {},
  setFilters,
}: {
  filters: ITradeFilter;
  setFilters: Dispatch<SetStateAction<ITradeFilter>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className=" hover:bg-gray-100 cursor-pointer">
          Filter
          <SlidersVertical className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-4 flex gap-2 mx-4">
        <div>
          <Label className="mb-4">Symbol</Label>
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, symbol: value }))
            }
          >
            <SelectTrigger className="w-full cursor-pointer min-w-27">
              <SelectValue placeholder={filters.symbol} className="w-fit" />
            </SelectTrigger>
            <SelectContent className="min-w-27">
              <SelectGroup>
                {allTradeSymbols.map((symbol) => (
                  <SelectItem
                    className="cursor-pointer min-w-27"
                    value={symbol}
                  >
                    {symbol ?? "All"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-4">Source: </Label>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setFilters((prev) => ({ ...prev, source: "All" }))}
              disabled={!filters.source}
              variant={filters.source == "All" ? "default" : "outline"}
              className={cn(filters.source != "All" && "cursor-pointer")}
            >
              All
            </Button>
            <Button
              onClick={() => setFilters((prev) => ({ ...prev, source: "AI" }))}
              disabled={filters.source == "AI"}
              variant={filters.source == "AI" ? "default" : "outline"}
              className={cn(filters.source != "AI" && "cursor-pointer")}
            >
              AI
            </Button>
            <Button
              onClick={() =>
                setFilters((prev) => ({ ...prev, source: "MANUAL" }))
              }
              disabled={filters.source == "MANUAL"}
              variant={filters.source == "MANUAL" ? "default" : "outline"}
              className={cn(filters.source != "MANUAL" && "cursor-pointer")}
            >
              Manual
            </Button>
          </div>
        </div>
        <div>
          {/* date from */}
          <Label className="mb-4">Date from</Label>
          <div className="flex flex-col gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-30 justify-between font-normal"
                >
                  {filters.date_from
                    ? filters.date_from.toLocaleDateString()
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={filters.date_from}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setFilters((prev) => ({ ...prev, date_from: date }));
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          {/* date to */}
          <Label className="mb-4">Date to</Label>
          <div className="flex flex-col gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-30 justify-between font-normal"
                >
                  {filters.date_from
                    ? filters.date_from.toLocaleDateString()
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={filters.date_to}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setFilters((prev) => ({ ...prev, date_to: date }));
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
