'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PageBody } from '@/src/components/AppShell';
import { Button } from '@/src/components/Button';
import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { Header } from '@/src/components/Header';
import { useTheme } from '@/src/hooks/useTheme';
import { useToast } from '@/src/hooks/useToast';
import { removerToken } from '@/src/lib/auth';
import { USE_MOCK } from '@/src/services/config';
import type { ThemePreference } from '@/src/styles/themes';

import {
  Grupo,
  GrupoTitulo,
  Info,
  RadioDescricao,
  RadioLinha,
  RadioTexto,
  RadioTitulo,
  Radios,
  Rodape,
} from './configuracoes.styles';

const OPCOES_TEMA: {
  value: ThemePreference;
  titulo: string;
  descricao: string;
}[] = [
  { value: 'light', titulo: 'Claro', descricao: 'Tema claro sempre ativo' },
  { value: 'dark', titulo: 'Escuro', descricao: 'Tema escuro sempre ativo' },
  {
    value: 'system',
    titulo: 'Sistema',
    descricao: 'Segue a aparência do dispositivo',
  },
];

export default function ConfiguracoesPage() {
  const router = useRouter();
  const toast = useToast();
  const { preference, setPreference } = useTheme();
  const [confirmarReset, setConfirmarReset] = useState(false);

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
            {OPCOES_TEMA.map((opcao) => (
              <RadioLinha key={opcao.value} $ativo={preference === opcao.value}>
                <input
                  type="radio"
                  name="tema"
                  value={opcao.value}
                  checked={preference === opcao.value}
                  onChange={() => setPreference(opcao.value)}
                />
                <RadioTexto>
                  <RadioTitulo>{opcao.titulo}</RadioTitulo>
                  <RadioDescricao>{opcao.descricao}</RadioDescricao>
                </RadioTexto>
              </RadioLinha>
            ))}
          </Radios>
        </Grupo>

        {USE_MOCK && (
          <Grupo>
            <GrupoTitulo>Dados de demonstração</GrupoTitulo>
            <Info>
              A aplicação está usando dados fictícios armazenados neste
              dispositivo. Você pode restaurar os agendamentos de exemplo a
              qualquer momento.
            </Info>
            <Button variant="secondary" onClick={() => setConfirmarReset(true)}>
              Restaurar dados de exemplo
            </Button>
          </Grupo>
        )}

        <Grupo>
          <GrupoTitulo>Conta</GrupoTitulo>
          <Button variant="ghost" onClick={sair}>
            Sair
          </Button>
        </Grupo>

        <Rodape>Barbearia · Painel de agendamentos</Rodape>
      </PageBody>
    </>
  );
}
