const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
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

client.on('message', async (msg) => {
    if (msg.body === '!jadistiker') {
        try {
            const media = msg.downloadMedia();
            const sticker = new MessageMedia('image/png', media.data, media.mimetype);
            const chat = msg.getChat();
            msg.reply(sticker, { sendMediaAsSticker: true });
        } catch (error) {
            console.log(error);
        }
    }
});

client.on('message', async (msg) => {
    if (msg.body === '!tagsemua') {

        ///////// cek dulu jika bukan group
        if (msg.isGroupMsg === false) {
            return msg.reply('Maaf, perintah ini hanya bisa di gunakan dalam group!');
        } else {

            const chat = await msg.getChat();

            let text = '';
            let mentions = [];

            for (let participant of chat.participants) {
                mentions.push(`${participant.id.user}@c.us`);
                text += `@${participant.id.user} `;
            }

            await chat.sendMessage(text, { mentions });
        }
    }
});


client.initialize();

const kirimpesangambar = async (req, res) => {
    try {
        // const { to, message, image } = req.query.body || req.body;
        const to = req.body.to || req.query.to;
        const message = req.body.message || req.query.message;
        const image = req.body.image || req.query.image;
        if (!to) {
            return res.json({
                status: 'error',
                message: 'missing or empty "to" field'
            });
        }

        const number = to.replace(/-/g, '');
        const phone = `${number}@c.us`;
        const msg = message;

        if (!msg) {
            return res.json({
                status: 'error',
                message: 'missing or empty "message" field'
            });
        }

        if (!image) {
            return res.json({
                status: 'error',
                message: 'missing or empty "image" field'
            });
        }

        const isRegistered = await client.isRegisteredUser(phone);
        if (isRegistered) {
            // console.log(image);
            // const media = MessageMedia.fromFilePath(`./public/${image}`);
            const mediaByUrl = await MessageMedia.fromUrl(image, { unsafeMime: true });
            const send = await client.sendMessage(phone, mediaByUrl, {
                caption: msg
            });
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

const kirimpesan = async (req, res) => {
    try {
        // const { to, message } = req.query.body;
        const to = req.body.to || req.query.to;
        const message = req.body.message || req.query.message;
        if (!to) {
            return res.json({
                status: 'error',
                message: 'missing or empty "to" field'
            });
        }

        const number = to.replace(/-/g, '');
        const phone = `${number}@c.us`;
        const msg = message;

        if (!msg) {
            return res.json({
                status: 'error',
                message: 'missing or empty "message" field'
            });
        }
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
    kirimpesan,
    sendMassage,
    kirimpesangambar
};