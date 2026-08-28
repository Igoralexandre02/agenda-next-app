'use client';

import { useId } from 'react';

import { FieldError, FieldHint, FieldLabel, FieldRoot } from './styles';

export interface FieldProps {
  label: string;
  /** id do controle interno — associa label, hint e erro. */
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: (ids: {
    controlId: string;
    describedBy?: string;
  }) => React.ReactNode;
}

/**
 * Envolve um controle de formulário com label, texto de apoio e mensagem de erro,
 * cuidando das associações de acessibilidade (`htmlFor`, `aria-describedby`).
 */
export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  const generatedId = useId();
  const controlId = htmlFor ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <FieldRoot>
      <FieldLabel htmlFor={controlId}>{label}</FieldLabel>
      {children({ controlId, describedBy })}
      {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
      {error && (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      )}
    </FieldRoot>
  );
}
