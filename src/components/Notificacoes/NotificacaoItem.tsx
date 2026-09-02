'use client';

import { useState } from 'react';

import { Button } from '@/src/components/Button';
import { ClockIcon, WhatsAppIcon } from '@/src/components/icons';
import { useToast } from '@/src/hooks/useToast';
import type { Notificacao } from '@/src/types/notificacao';
import { TIPO_NOTIFICACAO_LABEL } from '@/src/types/notificacao';
import { formatarDataCurta, formatarHorario, isHoje } from '@/src/utils/date';
import { gerarLinkWhatsApp, gerarMensagemLembrete } from '@/src/utils/whatsapp';
import {
  ChevronIcon,
  ConteudoCollapse,
  ConteudoInterno,
  Detalhe,
  Detalhes,
  Item,
  ItemBotao,
  ItemTopo,
  Label,
  LinhaInfo,
  MensagemRemovido,
  Nome,
  PontoNaoLida,
  Tipo,
  TipoWrapper,
  Valor,
} from './styles';

interface NotificacaoItemProps {
  notificacao: Notificacao;
  /** Persiste `lida: true` no Strapi. Só é chamado se a notificação estiver não lida. */
  onAbrir: (documentId: string) => Promise<void>;
}

export function NotificacaoItem({
  notificacao,
  onAbrir,
}: NotificacaoItemProps) {
  const toast = useToast();
  const [marcando, setMarcando] = useState(false);
  const [aberto, setAberto] = useState(false);

  const { agendamento, lida, tipo } = notificacao;

  async function abrir() {
    if (lida || marcando) return;

    try {
      setMarcando(true);
      await onAbrir(notificacao.documentId);
    } catch {
      toast.erro('Não foi possível marcar a notificação como lida');
    } finally {
      setMarcando(false);
    }
  }

  const alternarCollapse = () => {
    setAberto((valor) => !valor);

    if (!lida) {
      abrir();
    }
  };

  function enviarLembrete() {
    if (!agendamento) return;

    const mensagem = gerarMensagemLembrete(
      agendamento.nome,
      agendamento.horario,
    );
    const link = gerarLinkWhatsApp(agendamento.numero, mensagem);

    if (!link) {
      toast.erro('Número de telefone inválido para este agendamento');
      return;
    }

    // Futuro: quando a API oficial do WhatsApp entrar, trocar este open()
    // por uma chamada de serviço mantendo a mesma origem de dados.
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  return (
    <Item $naoLida={!lida}>
      <ItemBotao
        type="button"
        onClick={alternarCollapse}
        aria-expanded={aberto}
      >
        <ItemTopo>
          <TipoWrapper>
            {!lida && <PontoNaoLida aria-hidden />}
            <Tipo>{TIPO_NOTIFICACAO_LABEL[tipo]}</Tipo>
          </TipoWrapper>

          <ChevronIcon
            width={18}
            height={18}
            $aberto={aberto}
            aria-hidden
          />
        </ItemTopo>

        <Nome>
          {agendamento?.nome ?? 'Agendamento removido'}
        </Nome>

        {agendamento && (
          <LinhaInfo>
            <ClockIcon width={16} height={16} />

            {formatarHorario(agendamento.horario)}

            {!isHoje(agendamento.data) &&
              ` · ${formatarDataCurta(agendamento.data)}`}
          </LinhaInfo>
        )}
      </ItemBotao>

      <ConteudoCollapse $aberto={aberto}>
        <ConteudoInterno>
          {agendamento ? (
            <>
              <Detalhes>
                <Detalhe>
                  <Label>Cliente</Label>
                  <Valor>{agendamento.nome}</Valor>
                </Detalhe>

                <Detalhe>
                  <Label>Horário</Label>
                  <Valor>
                    {formatarHorario(agendamento.horario)}
                  </Valor>
                </Detalhe>

                <Detalhe>
                  <Label>Data</Label>
                  <Valor>
                    {formatarDataCurta(agendamento.data)}
                  </Valor>
                </Detalhe>

                <Detalhe>
                  <Label>Telefone</Label>
                  <Valor>{agendamento.numero}</Valor>
                </Detalhe>
              </Detalhes>

              <Button
                variant="secondary"
                fullWidth
                leftIcon={<WhatsAppIcon width={18} height={18} />}
                onClick={enviarLembrete}
              >
                Enviar lembrete pelo WhatsApp
              </Button>
            </>
          ) : (
            <MensagemRemovido>
              Este agendamento não está mais disponível.
            </MensagemRemovido>
          )}
        </ConteudoInterno>
      </ConteudoCollapse>
    </Item>
  );
}
