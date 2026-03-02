import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import * as Popover from "@radix-ui/react-popover";

interface DatePickerFieldProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePickerField({ label, value, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm text-gray-700">{label}</label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-left flex items-center justify-between hover:border-[#FF6B35] transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
          >
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value ? format(value, "PPP") : "Select date"}
            </span>
            <CalendarIcon className="w-4 h-4 text-gray-400" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50"
            align="start"
            sideOffset={5}
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              initialFocus
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
