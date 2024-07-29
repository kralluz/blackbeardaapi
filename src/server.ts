import app from "./app";
var https = require('https');
var fs = require('fs');

const PORT: number = Number(process.env.PORT) || 3000;

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/samcontroll.cloud/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/samcontroll.cloud/fullchain.pem'),
    requestCert: false,
    rejectUnauthorized: false
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`)
    console.log(`Acesse: https://samcontroll.cloud:${PORT}`)
}); 
