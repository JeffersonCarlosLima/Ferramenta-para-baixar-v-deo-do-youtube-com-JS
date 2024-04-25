const fs = require('fs');
const ytdl = require('ytdl-core');

// URL do vídeo do YouTube que você deseja baixar
const videoURL = 'https://youtu.be/opG191wWuis';

// Diretório onde você deseja salvar o vídeo (certifique-se de que o diretório exista)
const outputDir = './download';

// Nome do arquivo de saída
const outputFilename = 'video.mp4';

// Opções de qualidade (consulte a documentação do ytdl-core para as opções disponíveis)
const qualityOptions = [
    { quality: 'highest' }, // Baixa a melhor qualidade disponível
    // { quality: 'lowest' },  // Baixa a qualidade mais baixa disponível
    // { quality: 'highestaudio' },  // Baixa apenas o áudio na melhor qualidade disponível
    // Outras opções conforme necessário
];

// Escolha a opção de qualidade desejada (por exemplo, 'highest' para a melhor qualidade)
const chosenQuality = qualityOptions[0]; // Altere o índice conforme necessário

// Crie uma stream de leitura para o vídeo com a opção de qualidade escolhida
const videoStream = ytdl(videoURL, chosenQuality);

// Crie uma stream de escrita para salvar o vídeo
const outputStream = fs.createWriteStream(`${outputDir}/${outputFilename}`);

// Pipe a stream de leitura para a stream de escrita para iniciar o download
videoStream.pipe(outputStream);

// Restante do código para acompanhar o progresso, lidar com erros, etc., permanece o mesmo
