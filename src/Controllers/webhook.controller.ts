import { Request, Response } from 'express';
import { chatSessions } from '../app';
import classifyMessage from '../utils/classifyMessages.util';
import handleStep from '../session/handleStep';

export const webhookGet = (req: any, res: any) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === process.env.WEBHOOK_TOKEN) {
            console.log("Webhook Verified!");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
};

export const webhookPost = async (req: Request, res: Response) => {
    const entries = req.body.entry;

    if (!entries) return res.status(400).send("No entries found");

    entries.forEach((entry: any) => {
        const changes = entry.changes;

        if (!changes) return;

        changes.forEach((change: any) => {
            const { classification } = classifyMessage(change);
            if (classification === "Resposta de Botão" || classification === "Mensagem Recebida" || classification === "Resposta de Lista") {
                const message = change.value.messages[0];
                const from = message.from;
                let content;

                if (message.type === "interactive") {
                    const reply = message.interactive?.button_reply || message.interactive?.list_reply;
                    reply ? content = reply.title : console.error("Mensagem interativa sem botão ou lista de resposta:", message);
                } else {
                    content = message.text.body;
                }

                // console.log("Mensagem recebida de:", from);
                // console.log("Conteúdo da mensagem:", content);
                // console.log("Classificação da mensagem:", classification);

                const isNewMessage = !chatSessions[from];

                handleStep(from, content, isNewMessage);
            }
        });
    });
    res.sendStatus(200);
};
