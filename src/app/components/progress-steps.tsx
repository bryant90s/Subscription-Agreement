import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  completed?: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id || step.completed;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${
                      isCompleted
                        ? "bg-[#FF6B35] text-white"
                        : isCurrent
                        ? "bg-[#FF6B35] text-white"
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{step.id}</span>
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs sm:text-sm text-center
                    ${
                      isCurrent || isCompleted
                        ? "text-gray-900"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 relative top-[-16px]">
                  <div
                    className={`h-full transition-all ${
                      isCompleted ? "bg-[#FF6B35]" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}