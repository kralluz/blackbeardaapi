import axios from 'axios';
import sendListMessage from "../../utils/send's/sendList.util";

interface Session {
  data: {
    date: any;
    name: any;
    exam: any;
  };
  step: string;
}

interface Schedule {
  title: string;
  rows: {
    id: string;
    title: string;
    description: string;
  }[];
}

export default function handleDateStep(
  session: Session,
  content: any
) {
  console.log("Iniciando handleDateStep");
  console.log("Session antes da atualização:", session);

  session.data.date = content;
  session.step = "hour";
  console.log("Session após a atualização:", session);
  
  sendAvailableTimes(session);
}

async function sendAvailableTimes(session: Session) {
  const headerText = "Selecione um horário do dia.";
  const bodyText = "Clique em *Ver* para visualizar os horários disponíveis";
  
  console.log("Iniciando sendAvailableTimes");

  try {
    console.log("Tentando obter dados da API");
    const response = await axios.get('https://cardapioapi-1.onrender.com/schedules');
    console.log("Resposta da API recebida:", response.data);

    const schedules: Schedule[] = response.data;

    // Prepara as seções a partir dos dados da API
    const sections = schedules.map(schedule => ({
      title: schedule.title,
      rows: schedule.rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
      }))
    }));

    console.log("Seções preparadas:", sections);
    sendListMessage(headerText, bodyText, sections);
    console.log("Mensagem de lista de horários enviada.");
  } catch (error) {
    console.error('Erro ao obter horários:', error);
    // Aqui você pode adicionar um tratamento de erro mais específico, se necessário
  }
}
