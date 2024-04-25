const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Seu servidor está online.</h1>');
});

app.post('/baixar-video', async (req, res) => {
    try {
        const linkVideo = req.body.linkVideo;
        const videoInfo = await ytdl.getInfo(linkVideo);
        const videoStream = ytdl(linkVideo, { quality: 'highestvideo' });

        // Remove caracteres inválidos do título para uso no nome do arquivo
        const safeTitle = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, '');

        res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
        videoStream.pipe(res);
    } catch (error) {
        console.error('Erro ao baixar o vídeo:', error.message);
        res.status(500).send('Erro ao baixar o vídeo.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
