import sendButton from "../utils/send's/sendButton.util";
import moment from 'moment-timezone';

const getGreeting = () => {
  const currentHour = moment().tz("America/Sao_Paulo").hours();

  if (currentHour >= 5 && currentHour < 12) {
    return "bom dia";
  } else if (currentHour >= 12 && currentHour < 19) {
    return "boa tarde";
  } else {
    return "boa noite";
  }
};


const sendWelcomeMessage = () => {
  const greeting = getGreeting();
  sendButton(`Olá, ${greeting}, como posso ajudar?`, [
    { id: "agendar", title: "Agendar um corte" },
    { id: "servicos", title: "Conheça os serviços" },
    { id: "atendente", title: "Falar com o barbeiro" },
  ]);
};

export default sendWelcomeMessage;
