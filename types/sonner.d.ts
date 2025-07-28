declare module 'sonner' {
  import { ComponentProps, ReactNode } from 'react';

  export interface ToastProps {
    id?: string | number;
    title?: ReactNode;
    description?: ReactNode;
    duration?: number;
    className?: string;
    classNames?: {
      toast?: string;
      title?: string;
      description?: string;
      actionButton?: string;
      cancelButton?: string;
      error?: string;
      success?: string;
      info?: string;
      loading?: string;
    };
    icon?: ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
    cancel?: {
      label: string;
      onClick: () => void;
    };
    onDismiss?: () => void;
    onAutoClose?: () => void;
  }

  export interface ToasterProps {
    invert?: boolean;
    theme?: 'light' | 'dark' | 'system';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    hotkey?: string[];
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    toastOptions?: Partial<ToastProps>;
    className?: string;
    dir?: 'rtl' | 'ltr' | 'auto';
    style?: React.CSSProperties;
  }

  export const Toaster: React.FC<ToasterProps>;
  export function toast(message: string | ToastProps): void;
  export function toast(title: string, description: string): void;
  export function toast(props: ToastProps): void;
  export namespace toast {
    function success(message: string | ToastProps): void;
    function error(message: string | ToastProps): void;
    function info(message: string | ToastProps): void;
    function warning(message: string | ToastProps): void;
    function loading(message: string | ToastProps): void;
    function dismiss(id?: string | number): void;
    function custom(element: ReactNode, options?: Partial<ToastProps>): void;
  }
}
