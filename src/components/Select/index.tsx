'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from '@/src/components/Field';
import { controlCss } from '@/src/components/Field/styles';

const Wrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 16px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${({ theme }) => theme.colors.textMuted};
    border-bottom: 2px solid ${({ theme }) => theme.colors.textMuted};
    transform: translateY(-70%) rotate(45deg);
    pointer-events: none;
  }
`;

const StyledSelect = styled.select<{ $invalid?: boolean }>`
  ${controlCss}
  padding-right: 40px;
  cursor: pointer;
`;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'id'
> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, hint, error, id, options, ...rest }, ref) {
    return (
      <Field label={label} htmlFor={id} hint={hint} error={error}>
        {({ controlId, describedBy }) => (
          <Wrapper>
            <StyledSelect
              ref={ref}
              id={controlId}
              $invalid={Boolean(error)}
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={describedBy}
              {...rest}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>
          </Wrapper>
        )}
      </Field>
    );
  },
);
