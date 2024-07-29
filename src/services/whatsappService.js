import axios from 'axios';

export const handleIncomingMessage = async (message) => {
    const senderNumber = message.entry[0].changes[0].value.messages[0].from;
    const responseMessage = 'Olá! Esta é uma resposta automática. Como posso ajudar?';
  
    await sendMessage(senderNumber, responseMessage);
  };
  
  const sendMessage = async (to, message) => {
    try { 
      await axios.post(process.env.WTP_URL, {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message },
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.GRAPH_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response.data);
    }
  };