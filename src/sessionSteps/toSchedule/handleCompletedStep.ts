import axios from 'axios';
import sendMessage from "../../utils/send's/sendMessage.util";

export default async function handleCompletedStep(session: any, content: string, from: string | number, chatSessions: { [x: string]: any; }) {
    console.log("session");
    console.log("session");
    console.log(session);
    console.log("session");
    console.log("session");

    if (content === "Confirmar ✅") {
        const { name, service, paymentMethod, date, hour } = session.data;

        // Formata a data para o formato ISO 8601, se necessário
        const formattedDate = `${date}T${hour}:00Z`; // Ajuste o fuso horário conforme necessário

        const appointment = {
            name,
            service,
            paymentMethod,
            date: formattedDate
        };

        try {
            await addAppointmentToAPI(appointment);
            setTimeout(() => {
                sendMessage("Seu agendamento foi confirmado. Obrigado!");
            }, 1000);
        } catch (error) {
            sendMessage("Ocorreu um erro ao confirmar seu agendamento. Tente novamente.");
            console.log(error);
        }

    } else {
        sendMessage("Por favor, reinicie o processo de agendamento, pois os dados fornecidos estão incorretos.");
        delete chatSessions[from];
    }
}

async function addAppointmentToAPI(appointment: any) {
    const { date } = appointment;
    const [day, month, yearTime] = date.split('/');
    const [year, time] = yearTime.split('T');
    const isoDate = new Date(`${year}-${month}-${day}T${time}`);
    const body = {
        ...appointment,
        date: isoDate.toISOString()
    };

    try {
        const response = await axios.post('https://cardapioapi-1.onrender.com/appointments', body);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar o agendamento:", error);
        throw error;
    }
}
