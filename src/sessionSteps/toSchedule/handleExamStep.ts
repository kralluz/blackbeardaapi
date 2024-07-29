import sendListMessage from "../../utils/send's/sendList.util";
import sendMessage from "../../utils/send's/sendMessage.util";

export default function handlePaymentStep(
  session: { data: { paymentMethod: string }; step: string, chatId: string },
  content: string
) {
  const paymentMapping: { [key: string]: string } = {
    pix: "Pix",
    dinheiro: "Dinheiro",
    cartao: "Cartao",
  };

  const normalizedContent = content.toLowerCase().trim();

  if (paymentMapping.hasOwnProperty(normalizedContent)) {
    session.data.paymentMethod = paymentMapping[normalizedContent];
    session.step = "date";
    sendAvailableTimes(session);
    console.log("Processo de confirmação iniciado.");
  } else {
    console.log("Erro: Conteúdo recebido não corresponde a nenhum método de pagamento mapeado.");
    sendMessage(
      "Não foi possível identificar o método de pagamento selecionado. Por favor, selecione um método válido."
    );
  }
}

function sendAvailableTimes(session: any) {
  const headerText = "Selecione um dia da semana";
  const bodyText = "Clique em *Ver Horários* para visualizar os horários disponíveis";
  const sections = [
    {
      title: "Segunda-feira",
      rows: [
        {
          id: "opcao1",
          title: "29/07/2024", 
          description: "Escolher um horário na segunda-feira",
        },
      ],
    },
    {
      title: "Terça-feira",
      rows: [
        {
          id: "opcao2",
          title: "30/07/2024", 
          description: "Escolher um horário na terça-feira",
        },
      ],
    },
    {
      title: "Quarta-feira",
      rows: [
        {
          id: "opcao3",
          title: "31/08/20724", 
          description: "Escolher um horário na quarta-feira",
        },
      ],
    },
    {
      title: "Quinta-feira",
      rows: [
        {
          id: "opcao4",
          title: "01/08/2024", 
          description: "Escolher um horário na quinta-feira",
        },
      ],
    },
    {
      title: "Sexta-feira",
      rows: [
        {
          id: "opcao5",
          title: "02/08/2024", 
          description: "Escolher um horário na sexta-feira",
        },
      ],
    },
    {
      title: "Sábado",
      rows: [
        {
          id: "opcao6",
          title: "03/08/2024", 
          description: "Escolher um horário no sábado",
        },
      ],
    },
  ];  

  sendListMessage(headerText, bodyText, sections);
  console.log("Mensagem de lista de horários enviada.");
}
