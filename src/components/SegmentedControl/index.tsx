'use client';

import styled from 'styled-components';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

const Group = styled.div<{ $wrap: boolean }>`
  display: flex;
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  overflow-x: ${({ $wrap }) => ($wrap ? 'visible' : 'auto')};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Segment = styled.button<{ $active: boolean }>`
  flex: ${({ $active }) => ($active ? '1 0 auto' : '1 0 auto')};
  min-height: 38px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.transition.fast},
    color ${({ theme }) => theme.transition.fast};

  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadows.sm : 'none')};
`;

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  /** Permite quebrar em várias linhas (útil com muitas opções). */
  wrap?: boolean;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap = false,
}: SegmentedControlProps<T>) {
  return (
    <Group role="radiogroup" aria-label={ariaLabel} $wrap={wrap}>
      {options.map((opt) => (
        <Segment
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          $active={opt.value === value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Segment>
      ))}
    </Group>
  );
}
