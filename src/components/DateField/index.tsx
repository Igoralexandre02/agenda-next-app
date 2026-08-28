'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from '@/src/components/Field';
import { controlCss } from '@/src/components/Field/styles';

/**
 * Usa `<input type="date">` nativo — melhor experiência no mobile (abre o
 * date picker do sistema) e zero dependências extras.
 */
const StyledDateInput = styled.input<{ $invalid?: boolean }>`
  ${controlCss}
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    opacity: 0.55;
    cursor: pointer;
  }
`;

export interface DateFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'type'
> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  function DateField({ label, hint, error, id, ...rest }, ref) {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error}>
        {({ controlId, describedBy }) => (
          <StyledDateInput
            ref={ref}
            id={controlId}
            type="date"
            $invalid={Boolean(error)}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={describedBy}
            {...rest}
          />
        )}
      </Field>
    );
  },
);
