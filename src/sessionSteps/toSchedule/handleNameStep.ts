import sendButton from "../../utils/send's/sendButton.util";
import sendListMessage from "../../utils/send's/sendList.util";

export default function handleNameStep(
  session: { data: { name: any }; step: string },
  content: any
) {
  const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
  if (nameRegex.test(content)) {
    session.data.name = content;
    session.step = "insurance";
    const headerText = "Serviços";
    const bodyText = "Clique no botão a baixo para selecionar";
    const sections = [
      {
        title: "Serviços únicos",
        rows: [
          {
            id: "servico1",
            title: "Corte de cabelo", 
            description: "Valor: R$ 35,00 - De acordo com a preferência do cliente.",
          },
          {
            id: "servico2",
            title: "Corte de barba",
            description: "Valor: R$ 35,00 - Aparar e modelar com precisão, acabamento impecável.",
          },
          {
            id: "servico3",
            title: "Sobrancelha",
            description: "Valor: R$ 25,00 - Design e limpeza das sobrancelhas.",
          },
        ],
      },
      {
        title: "Pacotes",
        rows: [
          {
            id: "servico4",
            title: "Cabelo e Barba",
            description: " Valor:  R$ 70,00 - Corte de cabelo e barba.",
          },
          {
            id: "servico5",
            title: "Pigmentação de barba",
            description: "Valor: R$ 40,00 - Pigmentação para preencher e definir.",
          },
        ],
      },
    ];

    sendListMessage(headerText, bodyText, sections);

  } else {
    sendButton("Nome inválido. Por favor, digite um nome válido (apenas letras e espaços):", []);
  }
}
