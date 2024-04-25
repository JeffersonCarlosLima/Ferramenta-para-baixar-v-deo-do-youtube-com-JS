const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube que você deseja baixar
const videoURL = 'https://youtu.be/_rmTFScrYdQ';

// Diretório onde você deseja salvar o vídeo
const outputDir = './download';

// Obtenha informações sobre o vídeo
ytdl.getInfo(videoURL).then(info => {
    // Extrai o título do vídeo
    const videoTitle = info.videoDetails.title;

    // Substitui caracteres inválidos no nome do arquivo
    const sanitizedTitle = videoTitle.replace(/[^\w\s]/gi, '');

    // Nome do arquivo de saída
    const outputFilename = `${sanitizedTitle}.mp4`;

    // Tamanho total do vídeo em bytes
    const totalBytes = parseInt(info.formats[0].contentLength);

    // Cria uma stream de leitura para o vídeo
    const videoStream = ytdl(videoURL, { quality: 'highestvideo' });

    // Cria uma stream de escrita para salvar o vídeo
    const outputStream = fs.createWriteStream(`${outputDir}/${outputFilename}`);

    // Variáveis para acompanhar o progresso do download
    let downloadedBytes = 0;

    // Evento 'progress' para acompanhar o progresso do download
    videoStream.on('progress', (chunkLength, downloaded, total) => {
        downloadedBytes = downloaded;
        const percent = Math.min((downloadedBytes / totalBytes) * 100, 100); // Limitando a 100%
        const progressBarWidth = 50;
        const progress = Math.round((progressBarWidth * percent) / 100);
        const emptyProgress = progressBarWidth - progress;
        const progressBar = '='.repeat(progress) + ' '.repeat(emptyProgress);
        console.log(`[${progressBar}] ${percent.toFixed(2)}%`);
    });

    // Evento 'end' para lidar com o término do download
    videoStream.on('end', () => {
        console.log('[==================================================] 100.00%');
        console.log('Download concluído!');
    });

    // Pipe a stream de leitura para a stream de escrita para iniciar o download
    videoStream.pipe(outputStream);

}).catch(error => {
    console.error('Ocorreu um erro ao obter informações sobre o vídeo:', error);
});
