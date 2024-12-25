const express = require('express');
const { ZapBot } = require('./zapConn');  // Import the ZapBot class

const zapBot = new ZapBot('554896727007');  // Replace with your WhatsApp number

// Start Express Server
const app = express();
const port = 3100;
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Allow specific methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allow specific headers
  next();
});

// Initialize the bot and delay server start until ready
(async () => {
    try {
        await zapBot.initialize();
        console.log("ZapBot Inicializado");

        // Define routes
        app.post('/sendMessage', async (req, res) => {
            const { phoneNumber, message } = req.body;

            if (!phoneNumber || !message) {
                return res.status(400).send({ error: "Telefone e conteudo da mensagem são itens obrigatorios." });
            }

            try {
                await zapBot.sendMessage(phoneNumber, message);
                res.send({ status: "Mensagem enviada!" });
            } catch (err) {
                res.status(500).send({ error: "Erro: ", details: err.message });
            }
        });

        app.listen(port, () => {
            console.log(`porta: ${port}`);
        });
    } catch (error) {
        console.error("F.");
    }
})();
