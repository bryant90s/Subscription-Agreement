import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface AddonItemProps {
  name: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  isAnnual: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function AddonItem({
  name,
  monthlyPrice,
  yearlyPrice,
  isAnnual,
  checked,
  onCheckedChange,
}: AddonItemProps) {
  const displayPrice = isAnnual && yearlyPrice ? yearlyPrice : monthlyPrice;
  const interval = isAnnual && yearlyPrice ? "year" : "month";

  return (
    <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all bg-white">
      <div className="flex items-center gap-3">
        <Checkbox.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center transition-all"
        >
          <Checkbox.Indicator>
            <Check className="w-3.5 h-3.5 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className="text-sm text-gray-900">{name}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">
        ${displayPrice}/{interval}
      </span>
    </label>
  );
}
