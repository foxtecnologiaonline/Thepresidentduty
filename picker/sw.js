/*
 * A raiz do site deixou de ser um app com service worker (agora é só a tela de
 * escolha entre /v1/ e /v2/, cada um com o seu próprio). Quem visitou a raiz
 * quando ela ainda era o jogo v1.0 sozinho ficou com um service worker antigo
 * de escopo "/" que intercepta a navegação e serve a página antiga do cache,
 * sem nunca buscar a nova — este arquivo substitui aquele service worker e se
 * autodestrói, liberando a navegação normal.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
