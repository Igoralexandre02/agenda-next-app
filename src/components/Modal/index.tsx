'use client';

import { useId, useRef } from 'react';

import { Dialog, Overlay, Title } from './styles';
import {
  Portal,
  useEscapeKey,
  useFocusTrap,
  useLockBodyScroll,
} from './shared';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Oculta visualmente o título mantendo-o para leitores de tela. */
  hideTitle?: boolean;
  children: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  hideTitle = false,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useLockBodyScroll(open);
  useEscapeKey(open, onClose);
  useFocusTrap(open, dialogRef);

  if (!open) return null;

  return (
    <Portal>
      <Overlay
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <Dialog
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <Title
            id={titleId}
            style={
              hideTitle
                ? {
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                    whiteSpace: 'nowrap',
                  }
                : undefined
            }
          >
            {title}
          </Title>
          {children}
        </Dialog>
      </Overlay>
    </Portal>
  );
}

export {
  Actions as ModalActions,
  Description as ModalDescription,
} from './styles';
