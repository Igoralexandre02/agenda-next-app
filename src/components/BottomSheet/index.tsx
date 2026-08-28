'use client';

import { useId, useRef } from 'react';

import {
  Portal,
  useEscapeKey,
  useFocusTrap,
  useLockBodyScroll,
} from '@/src/components/Modal/shared';
import {
  Body,
  CloseButton,
  Footer,
  Grabber,
  Head,
  HeadTitle,
  Overlay,
  Sheet,
} from './styles';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Ações fixas no rodapé (ex: "Limpar" / "Aplicar"). */
  footer?: React.ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  footer,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useLockBodyScroll(open);
  useEscapeKey(open, onClose);
  useFocusTrap(open, sheetRef);

  if (!open) return null;

  return (
    <Portal>
      <Overlay
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <Sheet
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <Grabber aria-hidden />
          <Head>
            <HeadTitle id={titleId}>{title}</HeadTitle>
            <CloseButton onClick={onClose} aria-label="Fechar">
              ✕
            </CloseButton>
          </Head>
          <Body>{children}</Body>
          {footer && <Footer>{footer}</Footer>}
        </Sheet>
      </Overlay>
    </Portal>
  );
}
