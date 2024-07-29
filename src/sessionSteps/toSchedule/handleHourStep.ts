import linkGeneratetoCalendar from "../../utils/linkGeneratetoCalendar";
import sendButton from "../../utils/send's/sendButton.util";

export default function handleHourStep(
  session: any,
  content: any
) {
  console.log("session");
  console.log("session");
  console.log(session);
  console.log("session");
  console.log("session");

  session.data.hour = content;
  console.log("session")
  console.log("session")
  console.log("session")
  console.log(session)
  console.log("session")
  console.log("session")
  console.log("session")
  session.step = "completed";
  console.log("Estado da sessão atualizado para 'confirm' em handleDateStep");  // Log adicionado
  const buttons = [
    { id: "cancel", title: "cancelar ⛔" },
    { id: "confirm", title: "Confirmar ✅" },
  ];
  const confirmationMsg =
   `Confirma o agendamento para ${session.data.name} no dia ${session.data.date} para o exame ${session.data.exam}?`;

  sendButton(confirmationMsg, buttons);
}
