import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleWelcomeStep(session: { step: string; }, content: any) {
    switch (content) {
        case "Agendar um corte":
            session.step = "name";
            sendMessage("Por favor, informe o seu nome completo.");
            break;
        case "Conheça os serviços":
            sendMessage("*Cabelo*: R$ 35,00\n*Barba*: R$ 35,00\n*Cabelo e barba com hidratação*: R$ 75,00\n*Sobrancelha*: R$ 25,00\n*Pigmentação de barba*: R$ 40,00");
            break;
        case "Falar com o barbeiro":
            sendMessage("Entendido! aguarde um momento,  por favor.");
            /* notificar o barbeiro */
            /* desabilitar o bot para este número por 1h ou mais */
            session.step = "welcome";
            break;
        default:
            sendMessage("Desculpe, não entendi. Por favor, escolha uma das opções disponíveis.");
    }
}
