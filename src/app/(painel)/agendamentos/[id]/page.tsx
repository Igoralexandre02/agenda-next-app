'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

import { AcoesAgendamento } from '@/src/components/agendamentos/AcoesAgendamento';
import { PageBody } from '@/src/components/AppShell';
import { ErrorState } from '@/src/components/ErrorState';
import { Header } from '@/src/components/Header';
import { ClockIcon, PhoneIcon } from '@/src/components/icons';
import { Loading } from '@/src/components/Loading';
import { StatusBadge } from '@/src/components/StatusBadge';
import { useAgendamento } from '@/src/hooks/useAgendamento';
import {
  formatarDataExtensa,
  formatarHorario,
  nomeDiaSemana,
} from '@/src/utils/date';
import { linkTelefone } from '@/src/utils/phone';

import {
  AcoesTitulo,
  Cartao,
  Cliente,
  DataHora,
  Divisor,
  Linha,
  LinkTelefone,
  Rotulo,
  Valor,
} from './detalhes.styles';

export default function DetalhesAgendamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { agendamento, loading, error, recarregar } = useAgendamento(id);

  return (
    <>
      <Header title="Agendamento" showBack backHref="/agendamentos" />
      <PageBody>
        {loading && <Loading label="Carregando agendamento…" />}

        {!loading && (error || !agendamento) && (
          <ErrorState
            title="Agendamento não encontrado"
            description={error ?? 'Este agendamento pode ter sido removido.'}
            onRetry={recarregar}
          />
        )}

        {!loading && agendamento && (
          <>
            <Cartao>
              <Linha>
                <Cliente>{agendamento.nome}</Cliente>
              </Linha>

              <Linha>
                <Rotulo>Data</Rotulo>
                <Valor>
                  {formatarDataExtensa(agendamento.data)} ·{' '}
                  {nomeDiaSemana(agendamento.data)}
                </Valor>
              </Linha>

              <DataHora>
                <ClockIcon />
                {formatarHorario(agendamento.horario)}
              </DataHora>

              <Divisor />

              <Linha>
                <Rotulo>Telefone</Rotulo>
                <LinkTelefone href={linkTelefone(agendamento.telefone)}>
                  <PhoneIcon />
                  {agendamento.telefone}
                </LinkTelefone>
              </Linha>

              <Linha>
                <Rotulo>Status</Rotulo>
                <div>
                  <StatusBadge status={agendamento.status} />
                </div>
              </Linha>
            </Cartao>

            <section>
              <AcoesTitulo>Ações</AcoesTitulo>
              <AcoesAgendamento
                agendamento={agendamento}
                onChanged={recarregar}
                onDeleted={() => router.replace('/agendamentos')}
              />
            </section>
          </>
        )}
      </PageBody>
    </>
  );
}
