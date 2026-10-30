'use client';

import { useEffect, useRef, useState } from 'react';

import { MoreVerticalIcon } from '@/src/components/Icons';
import { Menu, MenuItem, TriggerButton, Wrapper } from './styles';

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  items,
  triggerLabel = 'Ações',
  onOpenChange,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpwards(spaceBelow < 170 && spaceAbove > spaceBelow);
    }

    setOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        onOpenChange?.(false);
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <Wrapper
      ref={containerRef}
      $open={open}
      data-dropdown-open={open}
      onClick={(e) => e.stopPropagation()}
    >
      <TriggerButton
        type="button"
        $active={open}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
        title={triggerLabel}
      >
        <MoreVerticalIcon width={18} height={18} />
      </TriggerButton>

      {open && (
        <Menu role="menu" $openUpwards={openUpwards}>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              role="menuitem"
              type="button"
              $destructive={item.destructive}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
                onOpenChange?.(false);
                item.onClick();
              }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}

