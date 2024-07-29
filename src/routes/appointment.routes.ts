import express from 'express';
import { webhookGet, webhookPost } from '../Controllers/webhook.controller';

const appointmentRouter = express.Router();

appointmentRouter.get('/webhook', webhookGet);
appointmentRouter.post('/webhook', webhookPost);

export default appointmentRouter;
