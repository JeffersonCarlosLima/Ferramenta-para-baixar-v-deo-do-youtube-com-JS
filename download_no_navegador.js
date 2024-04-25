const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());

app.post('/baixar-video', (req, res) => {
    const linkVideo = req.body.linkVideo;
    const videoStream = ytdl(linkVideo, { quality: 'highestvideo' });
    
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
    videoStream.pipe(res);
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
