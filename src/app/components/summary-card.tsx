import { Check } from "lucide-react";

interface SummaryCardProps {
  selectedPlan: string;
  isAnnual: boolean;
  planPrice: number;
  monthlyPrice?: number;
  setupFee: number;
  addons: { name: string; price: number }[];
  discount: { type: "percentage" | "flat"; value: number };
  onSubmit: () => void;
  isFormValid?: boolean;
}

export function SummaryCard({
  selectedPlan,
  isAnnual,
  planPrice,
  monthlyPrice,
  setupFee,
  addons,
  discount,
  onSubmit,
  isFormValid,
}: SummaryCardProps) {
  const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  const subtotal = planPrice + addonsTotal;
  
  let discountAmount = 0;
  if (discount.value > 0) {
    discountAmount =
      discount.type === "percentage"
        ? subtotal * (discount.value / 100)
        : discount.value;
  }

  const recurringAmount = subtotal - discountAmount;
  const totalDueToday = setupFee + recurringAmount;
  const annualTotal = isAnnual ? recurringAmount : recurringAmount * 12;
  
  // Calculate original annual price (12 x monthly price) for comparison
  const originalAnnualPrice = monthlyPrice ? (monthlyPrice + addonsTotal) * 12 : 0;
  
  // Calculate savings
  const savingsAmount = isAnnual && originalAnnualPrice > totalDueToday 
    ? originalAnnualPrice - totalDueToday 
    : 0;

  return (
    <div className="lg:sticky lg:top-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h3>

        {/* Selected Plan */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedPlan}</p>
              <p className="text-xs text-gray-500">
                {isAnnual ? "Annual billing" : "Monthly billing - annual commitment"}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${planPrice.toLocaleString()}{isAnnual ? "/yr" : "/mo"}
            </p>
          </div>

          {/* Addons */}
          {addons.map((addon, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{addon.name}</p>
              <p className="text-sm text-gray-900">${addon.price}</p>
            </div>
          ))}

          {/* Setup Fee */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">One-time Setup Fee</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">$500</span>
              <span className="text-sm font-medium text-green-600">FREE</span>
            </div>
          </div>

          {/* Discount */}
          {discount.value > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <p className="text-sm">
                Discount{" "}
                {discount.type === "percentage"
                  ? `(${discount.value}%)`
                  : "(flat)"}
              </p>
              <p className="text-sm">-${discountAmount.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-3 pt-4 border-t border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Due Today</p>
            <div className="flex items-center gap-2">
              {isAnnual && originalAnnualPrice > totalDueToday && (
                <span className="text-sm text-gray-400 line-through">
                  ${originalAnnualPrice.toLocaleString()}
                </span>
              )}
              <p className="text-lg font-semibold text-gray-900">
                ${totalDueToday.toLocaleString()}
              </p>
            </div>
          </div>
          {isAnnual && savingsAmount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-green-600">YOU SAVE:</p>
              <p className="text-sm font-semibold text-green-600">
                ${savingsAmount.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Term Badge */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-900">
                12-Month Commitment
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Auto-renews unless canceled with 30-day notice
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all shadow-sm ${
            isFormValid
              ? 'bg-[#FF6B35] hover:bg-[#E55A2B] text-white hover:shadow-md cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Agreement
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          By submitting, you agree to the Subscription Services Agreement
        </p>
      </div>
    </div>
  );
}