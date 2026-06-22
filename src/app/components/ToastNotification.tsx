import { Toaster, toast } from 'sonner';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      theme="light"
      richColors
      expand={false}
    />
  );
}

export const showSuccess = (message: string) => 
  toast.success(message, { duration: 3000 });

export const showError = (message: string) => 
  toast.error(message, { duration: 4000 });

export const showInfo = (message: string) => 
  toast.info(message, { duration: 3000 });

export const showWarning = (message: string) => 
  toast.warning(message, { duration: 3000 });
