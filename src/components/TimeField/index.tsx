'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from '@/src/components/Field';
import { controlCss } from '@/src/components/Field/styles';

/** `<input type="time">` nativo — abre o time picker do sistema no mobile. */
const StyledTimeInput = styled.input<{ $invalid?: boolean }>`
  ${controlCss}
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    opacity: 0.55;
    cursor: pointer;
  }
`;

export interface TimeFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'type'
> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  function TimeField({ label, hint, error, id, ...rest }, ref) {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error}>
        {({ controlId, describedBy }) => (
          <StyledTimeInput
            ref={ref}
            id={controlId}
            type="time"
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
