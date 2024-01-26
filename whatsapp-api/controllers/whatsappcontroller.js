const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

const api = async (req, res) => {
    try {
        const { to, message } = req.body;
        const number = to.replace(/-/g, '');
        const phone = `${number}@c.us`;
        const msg = message;


        /////// cek jika nomer terdaftar di whatsapp
        const isRegistered = await client.isRegisteredUser(phone);
        if (isRegistered) {
            const send = await client.sendMessage(phone, msg);
            res.json({
                status: 'success',
                message: 'message sent',
                data: send
            });
        } else {
            res.json({
                status: 'error',
                message: 'number is not registered'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'failed to send message',
            error: error.message
        });
    }
};

const sendMassage = async (req, res) => {
    try {
        const nomor = req.query.nomor;
        const pesan = req.query.pesan;
        console.log(nomor);
        console.log(pesan);
        res.json({
            status: 'success',
            pesan: pesan,
            nomorPenerima: nomor
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'failed to send message',
            error: error.message
        });
    }
};

module.exports = {
    api,
    sendMassage
};