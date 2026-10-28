'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

import { Field } from '@/src/components/Field';
import { controlCss } from '@/src/components/Field/styles';

import { ChevronDownIcon } from '@/src/components/icons';

const Wrapper = styled.div`
  position: relative;
`;

const SelectIconWrapper = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
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
            <SelectIconWrapper aria-hidden>
              <ChevronDownIcon />
            </SelectIconWrapper>
          </Wrapper>
        )}
      </Field>
    );
  },
);
