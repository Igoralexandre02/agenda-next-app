'use client';

import { usePathname } from 'next/navigation';

import {
  CalendarIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
} from '@/src/components/icons';
import { HighlightItem, Item, Nav } from './styles';

const ITENS = [
  { href: '/', label: 'Início', Icon: HomeIcon, exact: true },
  { href: '/agendamentos', label: 'Agendamentos', Icon: CalendarIcon },
  { href: '/configuracoes', label: 'Ajustes', Icon: SettingsIcon },
] as const;

function isAtivo(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNavigation() {
  const pathname = usePathname() ?? '/';

  return (
    <Nav aria-label="Navegação principal">
      <Item
        href={ITENS[0].href}
        $active={isAtivo(pathname, ITENS[0].href, true)}
        aria-current={
          isAtivo(pathname, ITENS[0].href, true) ? 'page' : undefined
        }
      >
        <HomeIcon />
        {ITENS[0].label}
      </Item>

      <Item
        href={ITENS[1].href}
        $active={isAtivo(pathname, ITENS[1].href)}
        aria-current={isAtivo(pathname, ITENS[1].href) ? 'page' : undefined}
      >
        <CalendarIcon />
        {ITENS[1].label}
      </Item>

      <HighlightItem href="/agendamentos/novo" aria-label="Novo agendamento">
        <span className="icon">
          <PlusIcon />
        </span>
        Novo
      </HighlightItem>

      <Item
        href={ITENS[2].href}
        $active={isAtivo(pathname, ITENS[2].href)}
        aria-current={isAtivo(pathname, ITENS[2].href) ? 'page' : undefined}
      >
        <SettingsIcon />
        {ITENS[2].label}
      </Item>
    </Nav>
  );
}
