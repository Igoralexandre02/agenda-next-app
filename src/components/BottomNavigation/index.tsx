'use client';

import { usePathname } from 'next/navigation';

import {
  CalendarIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from '@/src/components/icons';
import { Item, Nav } from './styles';

const ITENS = [
  { href: '/', label: 'Início', Icon: HomeIcon, exact: true },
  { href: '/agendamentos', label: 'Agendamentos', Icon: CalendarIcon },
  { href: '/clientes', label: 'Clientes', Icon: UsersIcon },
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

      <Item
        href={ITENS[2].href}
        $active={isAtivo(pathname, ITENS[2].href)}
        aria-current={isAtivo(pathname, ITENS[2].href) ? 'page' : undefined}
      >
        <UsersIcon />
        {ITENS[2].label}
      </Item>

      <Item
        href={ITENS[3].href}
        $active={isAtivo(pathname, ITENS[3].href)}
        aria-current={isAtivo(pathname, ITENS[3].href) ? 'page' : undefined}
      >
        <SettingsIcon />
        {ITENS[3].label}
      </Item>
    </Nav>
  );
}
