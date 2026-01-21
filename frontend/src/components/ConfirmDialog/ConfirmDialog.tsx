import { useState, useCallback, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface ConfirmDialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

interface ConfirmDialogContextType {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
  }
  return context;
};

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

const variantStyles = {
  danger: {
    icon: AlertCircle,
    iconColor: "text-destructive",
    buttonVariant: "destructive" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
    buttonVariant: "default" as const,
  },
  info: {
    icon: Info,
    iconColor: "text-blue-600",
    buttonVariant: "default" as const,
  },
};

export const ConfirmDialogProvider = ({ children }: ConfirmDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(opts);
      setIsOpen(true);
      setResolveRef(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    resolveRef?.(true);
  }, [resolveRef]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    resolveRef?.(false);
  }, [resolveRef]);

  const variant = options?.variant || "warning";
  const { icon: Icon, iconColor, buttonVariant } = variantStyles[variant];

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCancel}
        >
          <Card 
            className="w-full max-w-md animate-in fade-in-0 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${iconColor}`} />
                <CardTitle>{options.title || "Confirm Action"}</CardTitle>
              </div>
              <CardDescription className="pt-2">
                {options.message}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2 justify-end">
              <Button 
                variant="outline"
                onClick={handleCancel}
              >
                {options.cancelText || "Cancel"}
              </Button>
              <Button 
                variant={buttonVariant}
                onClick={handleConfirm}
              >
                {options.confirmText || "Confirm"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogProvider;
