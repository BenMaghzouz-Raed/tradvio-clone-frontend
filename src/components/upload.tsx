import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import PlusCircle from "./icons/plus-circl";
import { useRef } from "react";

// TODO: replace label with filename after upload
export default function Upload({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(undefined);

  return (
    <Card className="w-72 h-36 flex items-center justify-center">
      <Input type="file" name={name} hidden ref={inputRef} />
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <PlusCircle />
        {label}
      </Button>
    </Card>
  );
}
