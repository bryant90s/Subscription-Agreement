import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { X } from "lucide-react";

interface SignatureFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function SignatureField({ label, value, onChange }: SignatureFieldProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedSignature, setTypedSignature] = useState("");

  useEffect(() => {
    if (mode === "type" && typedSignature) {
      // Generate signature from typed text
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "32px 'Brush Script MT', cursive";
        ctx.fillStyle = "#000000";
        ctx.fillText(typedSignature, 20, 60);
        onChange(canvas.toDataURL());
      }
    }
  }, [typedSignature, mode, onChange]);

  const handleClear = () => {
    if (mode === "draw" && sigCanvas.current) {
      sigCanvas.current.clear();
      onChange("");
    } else {
      setTypedSignature("");
      onChange("");
    }
  };

  const handleDrawEnd = () => {
    if (sigCanvas.current) {
      onChange(sigCanvas.current.toDataURL());
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-700">{label}</label>
      
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("draw")}
          className={`px-4 py-1.5 text-sm rounded-md transition-all ${
            mode === "draw"
              ? "bg-[#FF6B35] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Draw
        </button>
        <button
          type="button"
          onClick={() => setMode("type")}
          className={`px-4 py-1.5 text-sm rounded-md transition-all ${
            mode === "type"
              ? "bg-[#FF6B35] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Type
        </button>
      </div>

      {mode === "draw" ? (
        <div className="relative border-2 border-gray-200 rounded-lg bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: "w-full h-32 rounded-lg",
            }}
            onEnd={handleDrawEnd}
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={typedSignature}
            onChange={(e) => setTypedSignature(e.target.value)}
            placeholder="Type your full name"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-3xl font-['Brush_Script_MT',_cursive] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
          />
        </div>
      )}
    </div>
  );
}
