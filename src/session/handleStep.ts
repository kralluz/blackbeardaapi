import { chatSessions } from "../app";
import sendWelcomeMessage from "../Messages/Welcome.msg";
import sendMessage from "../utils/send's/sendMessage.util";
import processSessionStep from "./processSessionStep";

const SESSION_TIMEOUT_MINUTES = parseInt(process.env.SESSION_DURATION || "30");
const SESSION_TIMEOUT_MS = SESSION_TIMEOUT_MINUTES * 60 * 1000;

function hasSessionExpired(lastUpdated: number, currentTime: number): boolean {
  return (currentTime - lastUpdated) > SESSION_TIMEOUT_MS;
}

function expireSession(from: string | number): void {
  sendMessage( "Sua sessão expirou. Por favor, comece novamente.");
  delete chatSessions[from];
}

function handleStep(from: string | number, content: string, isNewMessage = false) {
  const currentTime = new Date().getTime();

  if (chatSessions[from]) {
    const session = chatSessions[from];

    if (hasSessionExpired(session.lastUpdated, currentTime)) {
      processSessionStep(from.toString(), content);

      if (hasSessionExpired(session.lastUpdated, currentTime)) {
        expireSession(from);
        return;
      }
    } else {
      session.lastUpdated = currentTime;

      if (!isNewMessage) {
        processSessionStep(from.toString(), content);
      }
    }
  } else {
    chatSessions[from] = {
      step: "welcome",
      data: {},
      lastUpdated: currentTime,
    };
    sendWelcomeMessage();
  }
}

export default handleStep;