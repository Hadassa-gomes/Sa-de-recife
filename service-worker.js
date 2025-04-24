const CACHE_NAME = 'saude-recife-cache-v1';  // Nome do cache
const urlsToCache = [
  '/Sa-de-recife/',  // Página inicial
  '/Sa-de-recife/index.html',
  '/Sa-de-recife/style.css',
  '/Sa-de-recife/manifest.json',
  '/Sa-de-recife/js/main.js',
  '/Sa-de-recife/img/saude_recife_logo.png',
  '/Sa-de-recife/img/foto%20homepage.png' // cuidado com espaços no nome do arquivo
];

// Instalando o Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Armazenando arquivos no cache');
        return cache.addAll(urlsToCache);  // Armazenando os arquivos no cache
      })
  );
});

// Ativando o Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativado');
  const cacheWhitelist = [CACHE_NAME];  // Definindo a versão do cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);  // Deletando caches antigos
          }
        })
      );
    })
  );
});

// Interceptando as requisições e retornando arquivos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;  // Retorna do cache se disponível
      }
      return fetch(event.request);  // Caso contrário, faz uma nova requisição
    })
  );
});
