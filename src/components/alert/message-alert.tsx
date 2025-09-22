import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { AlertDescription } from "../ui/alert";
import DismissableAlert from "./dismissable-alert";

export interface MessageAlertProps {
  className?: string;
  variant?: "destructive" | "default" | null | undefined;
  message?: string;
  setMessage?: (message: string) => void;
}

export default function Message({
  className,
  variant,
  message,
  setMessage,
}: MessageAlertProps) {
  const [showAlert, setShowAlert] = useState(false);
  const messageNotEmptyAndHidden = !!message && message !== "" && !showAlert;

  useEffect(() => {
    if (messageNotEmptyAndHidden) setShowAlert(true);
  }, [messageNotEmptyAndHidden]);

  return (
    <DismissableAlert
      className={cn("mb-4", className)}
      variant={variant}
      show={showAlert && !!message}
      setShow={(show) => {
        setShowAlert(show);
        if (!show) {
          setMessage?.("");
        }
      }}
    >
      <Terminal className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </DismissableAlert>
  );
}
