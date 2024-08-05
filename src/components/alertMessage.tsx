"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";

export default function AlertMessage({
  type,
  message,
  onClose,
  duration = 5000,
}: {
  type: string;
  message: string;
  onClose?: () => void;
  duration?: number;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <Alert
      variant="destructive"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col bg-neutral-900 bg-opacity-90 backdrop-blur-sm w-4/5 max-w-md p-6 rounded-lg shadow-lg z-50 relative"
    >
      <button
        className="absolute top-2 right-2 text-white hover:text-gray-400"
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <div>
          <AlertTitle className="text-white">{type}</AlertTitle>
          <AlertDescription className="text-white">{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
