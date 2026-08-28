'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from '@/src/components/Field';
import { controlCss } from '@/src/components/Field/styles';

const StyledInput = styled.input<{ $invalid?: boolean }>`
  ${controlCss}
`;

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id'
> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, ...rest },
  ref,
) {
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error}>
      {({ controlId, describedBy }) => (
        <StyledInput
          ref={ref}
          id={controlId}
          $invalid={Boolean(error)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
      )}
    </Field>
  );
});
