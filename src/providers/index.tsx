'use client';

import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

/** Agrupa todos os providers client-side da aplicação. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}

export { useTheme } from './ThemeProvider';
export { useToast } from './ToastProvider';
