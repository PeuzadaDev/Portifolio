const apiKey    = '';
const channelId = 'UCfqlb4OgAkKcwBZY3MmdsvQ';

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=1`)
  .then(response => response.json())
  .then(data => {
    const item = data.items?.[0];
    if (!item) {
      document.getElementById('video').textContent = 'Nenhum vídeo encontrado.';
      return;
    }

    const { videoId } = item.id;
    const iframe = document.createElement('iframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.title = item.snippet.title;
    iframe.loading = 'lazy';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    iframe.style.width = '100%';
    iframe.style.height = '100%';

    const container = document.getElementById('video');
    container.replaceChildren(iframe);
  })
  .catch(err => {
    console.error('Erro ao carregar vídeo:', err);
    document.getElementById('video').textContent = 'Erro ao carregar vídeo.';
  });
