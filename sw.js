// Service Worker for HY-Compass PWA
const CACHE_NAME = 'hy-compass-v1';
const urlsToCache = [
  './',
  './웹디자인초안.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  './캠퍼스맵.png'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('캐시 열기');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('캐시 추가 실패:', error);
      })
  );
  self.skipWaiting();
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// fetch 이벤트 - 네트워크 우선 전략
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 응답이 유효한지 확인
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 응답을 클론하여 캐시에 저장
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 가져오기
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // 오프라인 페이지 반환 (선택사항)
            return new Response('오프라인 모드입니다. 인터넷 연결을 확인해주세요.', {
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// 백그라운드 동기화 (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // 백그라운드 동기화 로직
  return Promise.resolve();
}

// 푸시 알림 (선택사항)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '새로운 알림이 있습니다.',
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'hy-compass-notification',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('HY-Compass', options)
  );
});

// 알림 클릭 처리 (선택사항)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

