'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@/src/components/icons';
import { NotificacoesBell } from '@/src/components/Notificacoes';
import { Bar, IconBtn, Slot, Subtitle, Title, TitleBox } from './styles';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  /** Mostra o botão de voltar. */
  showBack?: boolean;
  /** Destino do voltar. Se omitido, usa `router.back()`. */
  backHref?: string;
  /** Conteúdo à direita (ex: botão de ação). */
  action?: React.ReactNode;
  /** Oculta o sino de notificações (padrão: visível). */
  hideNotificacoes?: boolean;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  backHref,
  action,
  hideNotificacoes = false,
}: HeaderProps) {
  const router = useRouter();

  function handleBack() {
    if (backHref) router.push(backHref);
    else router.back();
  }

  return (
    <Bar>
      <Slot>
        {showBack && (
          <IconBtn type="button" onClick={handleBack} aria-label="Voltar">
            <ChevronLeftIcon />
          </IconBtn>
        )}
      </Slot>
      <TitleBox>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleBox>
      <Slot>
        {action}
        {!hideNotificacoes && <NotificacoesBell />}
      </Slot>
    </Bar>
  );
}
