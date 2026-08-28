'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/** Renderiza os filhos em um portal no <body> (somente no cliente). */
export function Portal({ children }: { children: React.ReactNode }) {
  const [montado, setMontado] = useState(false);
  // Portal só pode existir no cliente — marca a montagem uma única vez.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMontado(true), []);
  if (!montado) return null;
  return createPortal(children, document.body);
}

/** Trava o scroll do body enquanto `ativo` for verdadeiro. */
export function useLockBodyScroll(ativo: boolean) {
  useEffect(() => {
    if (!ativo) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [ativo]);
}

/** Fecha ao pressionar Esc. */
export function useEscapeKey(ativo: boolean, onClose: () => void) {
  useEffect(() => {
    if (!ativo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [ativo, onClose]);
}

/**
 * Move o foco para dentro do container ao abrir e devolve para o gatilho
 * ao fechar. Focus trap simples (Tab circula entre elementos focáveis).
 */
export function useFocusTrap(
  ativo: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const gatilhoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ativo) return;
    gatilhoRef.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    if (!container) return;

    const focaveis = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );

    const primeiro = focaveis()[0];
    (primeiro ?? container).focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const itens = focaveis();
      if (itens.length === 0) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    container.addEventListener('keydown', handler);
    return () => {
      container.removeEventListener('keydown', handler);
      gatilhoRef.current?.focus?.();
    };
  }, [ativo, containerRef]);
}
