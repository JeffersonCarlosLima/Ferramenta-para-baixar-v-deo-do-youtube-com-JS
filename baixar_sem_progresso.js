
function baixarVideo(){
    let linkVideo = document.querySelector(`#link-video`).value;
    
    console.log(linkVideo);
    const fs = require('fs');
    const ytdl = require('ytdl-core');
    
    // URL do vídeo do YouTube que você deseja baixar
    const videoURL = linkVideo;
    
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
    
        // Pipe a stream de leitura para a stream de escrita para iniciar o download
        videoStream.pipe(outputStream);
    
        // Restante do código para acompanhar o progresso, lidar com erros, etc., permanece o mesmo
    }).catch(error => {
        console.error('Ocorreu um erro ao obter informações sobre o vídeo:', error);
    });
}

