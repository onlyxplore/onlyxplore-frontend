"use client";

import React, { useState, useEffect } from "react";
import {
  DynamicIslandProvider,
  DynamicIsland,
  DynamicContainer,
  DynamicDescription,
  useDynamicIslandSize,
} from "./dynamic-island";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "default";
type ToastMessage = { id: string; message: string; type: ToastType };

// A simple global state mechanism to trigger toasts from anywhere
let globalAddToast: (message: string, type?: ToastType) => void = () => {};

export const toast = {
  success: (message: string) => globalAddToast(message, "success"),
  error: (message: string) => globalAddToast(message, "error"),
  message: (message: string) => globalAddToast(message, "default"),
  info: (message: string) => globalAddToast(message, "default"),
};

function ToasterContent({ currentToast }: { currentToast: ToastMessage | null }) {
  const { setSize } = useDynamicIslandSize();

  useEffect(() => {
    if (currentToast) {
      setSize("compactLong");
      const timer = setTimeout(() => {
        setSize("empty");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setSize("empty");
    }
  }, [currentToast, setSize]);

  if (!currentToast) return null;

  return (
    <DynamicContainer className="flex items-center h-full w-full justify-center">
      <div className="relative w-full flex items-center px-4 justify-center">
        <DynamicDescription className="flex items-center text-white text-sm font-medium">
          {currentToast.type === "success" && <CheckCircle2 className="h-5 w-5 mr-3 text-green-400 shrink-0" />}
          {currentToast.type === "error" && <AlertCircle className="h-5 w-5 mr-3 text-red-400 shrink-0" />}
          {currentToast.type === "default" && <Info className="h-5 w-5 mr-3 text-sky-400 shrink-0" />}
          <span className="truncate">{currentToast.message}</span>
        </DynamicDescription>
      </div>
    </DynamicContainer>
  );
}

export function Toaster() {
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    globalAddToast = (message: string, type: ToastType = "default") => {
      setCurrentToast({ id: Date.now().toString(), message, type });
      
      if (timerRef.current) clearTimeout(timerRef.current);
      
      // Reset toast after animation out
      timerRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, 3500); // 3000ms show time + 500ms animation out
    };
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <DynamicIslandProvider initialSize="empty">
          <DynamicIsland id="dynamic-toast">
            <ToasterContent currentToast={currentToast} />
          </DynamicIsland>
        </DynamicIslandProvider>
      </div>
    </div>
  );
}
