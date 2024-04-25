const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube que você deseja baixar
const videoURL = 'https://youtu.be/TOUSnA1hZ_Y';

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

    // Cria uma stream de leitura para o vídeo
    const videoStream = ytdl(videoURL);

    // Cria uma stream de escrita para salvar o vídeo
    const outputStream = fs.createWriteStream(`${outputDir}/${outputFilename}`);

    // Variáveis para acompanhar o progresso do download
    let downloadedBytes = 0;
    let totalBytes = parseInt(info.videoDetails.lengthSeconds) * 1000000; // Tamanho do vídeo em bytes

    // Evento 'progress' para acompanhar o progresso do download
    videoStream.on('progress', (chunkLength, downloaded, total) => {
        downloadedBytes = downloaded;
        console.log(`${((downloadedBytes / totalBytes) * 100).toFixed(2)}% baixado`);
    });

    // Evento 'end' para lidar com o término do download
    videoStream.on('end', () => {
        console.log('Download concluído!');
        // Adicione aqui o código para lidar com o que deve acontecer após o término do download
        // Por exemplo, você pode adicionar código para fechar a stream de escrita ou realizar outras tarefas relacionadas ao download concluído.
    });

    // Pipe a stream de leitura para a stream de escrita para iniciar o download
    videoStream.pipe(outputStream);

}).catch(error => {
    console.error('Ocorreu um erro ao obter informações sobre o vídeo:', error);
});
