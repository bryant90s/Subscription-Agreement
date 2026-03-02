interface PlanCardProps {
  name: string;
  description: string;
  yearlyPrice: number;
  monthlyPrice: number;
  isAnnual: boolean;
  isSelected: boolean;
  onSelect: () => void;
  featured?: boolean;
}

export function PlanCard({
  name,
  description,
  yearlyPrice,
  monthlyPrice,
  isAnnual,
  isSelected,
  onSelect,
  featured = false,
}: PlanCardProps) {
  const displayPrice = isAnnual ? yearlyPrice : monthlyPrice;
  const interval = isAnnual ? "year" : "month";
  const commitment = isAnnual ? "prepaid" : "x 12";

  return (
    <div
      onClick={onSelect}
      className={`
        relative p-6 rounded-xl border-2 cursor-pointer transition-all
        ${
          isSelected
            ? "border-[#FF6B35] bg-orange-50/30 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        }
        ${featured ? "ring-2 ring-[#FF6B35]/20" : ""}
      `}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-[#FF6B35] text-white text-xs rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div
          className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
          ${
            isSelected
              ? "border-[#FF6B35] bg-[#FF6B35]"
              : "border-gray-300 bg-white"
          }
        `}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-gray-900">
            ${displayPrice.toLocaleString()}
          </span>
          <span className="text-gray-600">/{interval}</span>
        </div>
        {!isAnnual && (
          <p className="text-xs text-gray-500 mt-1">{commitment}</p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        {isAnnual
          ? "Billed annually. Auto-renews after 12 months."
          : "Billed monthly. 12-month commitment required."}
      </p>
    </div>
  );
}
