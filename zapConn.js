const wppconnect = require('@wppconnect-team/wppconnect');

class ZapBot {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
        this.client = null;
    }

    start() {
        if (!this.client) {
            console.error("F.");
            return;
        }

        this.client.onMessage(async (message) => {
            console.log("Nova mensagem recebida:", message.content);

            if (message.body === "Hello") {
                try {
                    await this.client.sendText(message.from, "Resposta de teste do bot do zap salve salve familia kkkkkkkkj");
                    console.log("Mensagem enviada!");
                } catch (err) {
                    console.error("Erro ao enviar mensagem:", err);
                }
            }
        });
    }

    async sendMessage(phoneNumber, message) {
        if (!this.client) {
            throw new Error("Cliente não inicializado. Por favor, aguarde a conclusão da inicialização.");
        }

        try {
            await this.client.sendText(phoneNumber, message);
            console.log("Mensagem enviada para", phoneNumber);
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            throw err;
        }
    }

    async initialize() {
        try {
            this.client = await wppconnect.create({
                session: this.phoneNumber,
                catchLinkCode: (linkCode) => console.log('Código do link:', linkCode),
                catchQR: (qrCode) => console.log('Código QR:', qrCode),
                autoClose: 60000,
            });
            console.log("Cliente inicializado!");
            this.start();
        } catch (error) {
            console.error("Erro ao inicializar cliente:", error);
            throw error;
        }
    }
}

module.exports = { ZapBot };
