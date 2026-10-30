'use client';

import { useRouter } from 'next/navigation';

import { PageBody } from '@/src/components/AppShell';
import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import {
  DeviceIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
} from '@/src/components/Icons';
import { useTheme } from '@/src/hooks/useTheme';
import { removerToken } from '@/src/lib/auth';
import type { ThemePreference } from '@/src/styles/themes';

import {
  ContaAcao,
  ContaConteudo,
  ContaDescricao,
  ContaInfo,
  Grupo,
  GrupoTitulo,
  RadioDescricao,
  RadioIcon,
  RadioLinha,
  RadioTexto,
  RadioTitulo,
  Radios,
  Rodape,
} from './configuracoes.styles';

const OPCOES_TEMA = [
  {
    value: 'light' as ThemePreference,
    titulo: 'Claro',
    descricao: 'Tema claro sempre ativo',
    Icon: SunIcon,
  },
  {
    value: 'dark' as ThemePreference,
    titulo: 'Escuro',
    descricao: 'Tema escuro sempre ativo',
    Icon: MoonIcon,
  },
  {
    value: 'system' as ThemePreference,
    titulo: 'Sistema',
    descricao: 'Segue a aparência do dispositivo',
    Icon: DeviceIcon,
  },
];

export default function ConfiguracoesPage() {
  const router = useRouter();
  const { preference, setPreference } = useTheme();

  function sair() {
    removerToken();
    router.replace('/login');
  }

  return (
    <>
      <Header title="Configurações" />
      <PageBody>
        <Grupo>
          <GrupoTitulo>Aparência</GrupoTitulo>
          <Radios role="radiogroup" aria-label="Tema">
            {OPCOES_TEMA.map(({ value, titulo, descricao, Icon }) => (
              <RadioLinha key={value} $ativo={preference === value}>
                <input
                  type="radio"
                  name="tema"
                  value={value}
                  checked={preference === value}
                  onChange={() => setPreference(value)}
                />
                <RadioIcon $ativo={preference === value} aria-hidden>
                  <Icon />
                </RadioIcon>
                <RadioTexto>
                  <RadioTitulo>{titulo}</RadioTitulo>
                  <RadioDescricao>{descricao}</RadioDescricao>
                </RadioTexto>
              </RadioLinha>
            ))}
          </Radios>
        </Grupo>
        <Grupo>
          <ContaConteudo>
            <ContaInfo>
              <GrupoTitulo>Sua conta</GrupoTitulo>
              <ContaDescricao>
                Encerre sua sessão neste dispositivo com segurança.
              </ContaDescricao>
            </ContaInfo>

            <ContaAcao>
              <Button
                variant="secondary"
                leftIcon={<LogOutIcon width={16} height={16} />}
                onClick={sair}
              >
                Sair da conta
              </Button>
            </ContaAcao>
          </ContaConteudo>
        </Grupo>

        <Rodape>Barbearia · Painel de Gestão e Agendamentos</Rodape>
      </PageBody>
    </>
  );
}
