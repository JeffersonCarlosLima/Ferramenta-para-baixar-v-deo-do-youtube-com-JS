function baixarVideo() {
    let linkVideo = document.querySelector(`#link-video`).value;
    console.log(linkVideo);

    fetch('/baixar-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ linkVideo: linkVideo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao baixar o vídeo');
        }
        return response.blob();
    })
    .then(blob => {
        // Cria um link temporário para download do vídeo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
}
