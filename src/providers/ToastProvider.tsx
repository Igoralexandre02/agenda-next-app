'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
} from '@/src/components/Icons';
import {
  ToastViewport,
  ToastItem,
  ToastIcon,
  ToastMessage,
} from './toast.styles';

export type ToastTipo = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  tipo: ToastTipo;
  mensagem: string;
}

interface ToastContextValue {
  mostrar: (mensagem: string, tipo?: ToastTipo) => void;
  sucesso: (mensagem: string) => void;
  erro: (mensagem: string) => void;
  info: (mensagem: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DURACAO_MS = 3600;

function renderIcone(tipo: ToastTipo) {
  if (tipo === 'success') return <CheckCircleIcon />;
  if (tipo === 'error') return <AlertCircleIcon />;
  return <InfoIcon />;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const remover = useCallback((id: number) => {
    setToasts((atual) => atual.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback(
    (mensagem: string, tipo: ToastTipo = 'info') => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((atual) => [...atual, { id, tipo, mensagem }]);
      setTimeout(() => remover(id), DURACAO_MS);
    },
    [remover],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      mostrar,
      sucesso: (m) => mostrar(m, 'success'),
      erro: (m) => mostrar(m, 'error'),
      info: (m) => mostrar(m, 'info'),
    }),
    [mostrar],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport role="region" aria-label="Notificações">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            $tipo={toast.tipo}
            role="status"
            tabIndex={0}
            onClick={() => remover(toast.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                remover(toast.id);
              }
            }}
            aria-label={`Notificação: ${toast.mensagem}. Pressione Enter para fechar.`}
          >
            <ToastIcon $tipo={toast.tipo} aria-hidden>
              {renderIcone(toast.tipo)}
            </ToastIcon>
            <ToastMessage>{toast.mensagem}</ToastMessage>
          </ToastItem>
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>');
  }
  return ctx;
}
