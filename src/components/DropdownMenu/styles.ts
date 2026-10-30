'use client';

import styled, { css, keyframes } from 'styled-components';

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Wrapper = styled.div<{ $open?: boolean }>`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  z-index: ${({ $open }) => ($open ? 50 : 'auto')};
`;

export const TriggerButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.borderStrong : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surfaceRaised : theme.colors.surfaceMuted};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  transition:
    transform 100ms ${({ theme }) => theme.easing.out},
    color 120ms ease,
    background-color 120ms ease,
    border-color 120ms ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceRaised};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:active {
    transform: scale(0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

export const Menu = styled.div<{ $openUpwards?: boolean }>`
  position: absolute;
  right: 0;
  ${({ $openUpwards }) =>
    $openUpwards
      ? css`
          bottom: calc(100% + 6px);
          transform-origin: bottom right;
        `
      : css`
          top: calc(100% + 6px);
          transform-origin: top right;
        `}
  min-width: 150px;
  width: max-content;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${fadeInScale} 120ms ${({ theme }) => theme.easing.out};
`;

export const MenuItem = styled.button<{ $destructive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme, $destructive }) =>
    $destructive ? theme.colors.dangerSolid : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  text-align: left;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  transition:
    background-color 100ms ease,
    color 100ms ease;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: ${({ theme, $destructive }) =>
      $destructive ? theme.colors.dangerSolid : theme.colors.textMuted};
    transition: color 100ms ease;
  }

  &:hover {
    background: ${({ theme, $destructive }) =>
      $destructive ? theme.colors.dangerBg : theme.colors.surfaceHover};
    color: ${({ theme, $destructive }) =>
      $destructive ? theme.colors.dangerText : theme.colors.text};

    svg {
      color: ${({ theme, $destructive }) =>
        $destructive ? theme.colors.dangerText : theme.colors.text};
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: -2px;
  }
`;

