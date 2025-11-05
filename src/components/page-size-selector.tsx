import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function PageSizeSelector({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <p className="min-w-[100px] text-sm flex">Rows per page</p>
      <Select onValueChange={(value) => onChange(Number.parseInt(value))}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder={`${value}`} className="w-fit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem value={`${option}`}>{option}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
