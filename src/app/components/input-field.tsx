import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  optional?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, error, optional, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm text-gray-700">
          {label}
          {optional && (
            <span className="text-gray-400 ml-1.5 font-normal">(optional)</span>
          )}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg border border-gray-200
            bg-gray-50 text-gray-900
            focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]
            transition-all
            ${error ? "border-red-300 bg-red-50" : ""}
            ${props.readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            ${className}
          `}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
