import axios from 'axios';
import sendListMessage from "../../utils/send's/sendList.util";

export default async function handleDateStep(
  session: { data: { date: any; name: any; exam: any }; step: string },
  content: any
) {
  console.log("session");
  console.log(session);
  console.log("session");

  session.data.date = content;
  session.step = "hour";
  console.log("Estado da sessão atualizado para 'hour' em handleDateStep");

  try {
    const response = await axios.get('https://cardapioapi-1.onrender.com/schedules');
    const schedules = response.data;

    // Prepara as seções a partir dos dados da API
    const sections = schedules.map((schedule: any) => ({
      title: schedule.title,
      rows: schedule.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
      }))
    }));

    sendAvailableTimes(sections);
  } catch (error) {
    console.error('Erro ao obter horários:', error);
    // Aqui você pode adicionar um tratamento de erro mais específico, se necessário
  }
}

function sendAvailableTimes(sections: any) {
  const headerText = "Selecione um horário.";
  const bodyText = "Clique em *Ver Horários* para visualizar os horários disponíveis";
  
  sendListMessage(headerText, bodyText, sections);
  console.log("Mensagem de lista de horários enviada.");
}
