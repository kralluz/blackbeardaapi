import sendListMessage from "../../utils/send's/sendList.util";

export default function handleDateStep(
  session: { data: { date: any; name: any; exam: any }; step: string },
  content: any
) {
  console.log("session");
  console.log(session);
  console.log("session");
  console.log("session");
  console.log("session");

  session.data.date = content;
  session.step = "hour";
  sendAvailableTimes(session);
}


function sendAvailableTimes(session: any) {
  const headerText = "Selecione um horário do dia.";
  const bodyText = "Clique em *Ver* para visualizar os horários disponíveis";
  const sections = [
    {
      title: "Horários Matutinos",
      rows: [
        {
          id: "opcao1",
          title: "08:00",
          description: "Horário matutino disponível",
        },
        {
          id: "opcao2",
          title: "09:00",
          description: "Horário matutino disponível",
        },
        {
          id: "opcao3",
          title: "10:00",
          description: "Horário matutino disponível",
        },
        {
          id: "opcao4",
          title: "11:00",
          description: "Horário matutino disponível",
        },
      ],
    },
    {
      title: "Horários Vespertinos",
      rows: [
        {
          id: "opcao5",
          title: "14:00",
          description: "Horário vespertino disponível",
        },
        {
          id: "opcao6",
          title: "15:00",
          description: "Horário vespertino disponível",
        },
        {
          id: "opcao7",
          title: "16:00",
          description: "Horário vespertino disponível",
        },
        {
          id: "opcao8",
          title: "17:00",
          description: "Horário vespertino disponível",
        },
      ],
    },
  ];

  sendListMessage(headerText, bodyText, sections);
  console.log("Mensagem de lista de horários enviada.");
}
