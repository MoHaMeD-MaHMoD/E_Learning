'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "0d3240aeca3ede9920a8308fe710b213",
"assets/AssetManifest.smcbin": "2bd087451047d3351308a38883705e3e",
"assets/assets/fonts/poppins/Poppins-Bold.ttf": "a3e0b5f427803a187c1b62c5919196aa",
"assets/assets/fonts/poppins/Poppins-Medium.ttf": "f61a4eb27371b7453bf5b12ab3648b9e",
"assets/assets/fonts/poppins/Poppins-SemiBold.ttf": "4cdacb8f89d588d69e8570edcbe49507",
"assets/assets/icons/background.jpg": "85f18bc9a9bb469f59b8dbcb86c50a83",
"assets/assets/icons/biology.jpg": "7fc030d47be14d3e0ec87e321063b989",
"assets/assets/icons/bumble_bee_captions.srt": "c38f7b94e35ba2ccbe5512f350139236",
"assets/assets/icons/Chemistry.jpg": "7b882969e9b99c06f8b90538e8b21764",
"assets/assets/icons/done.png": "750d48f4b0e0500081e3ba8269764a6b",
"assets/assets/icons/first-icon.png": "ba51cbdec86f273a29a5be9f1f6b4b39",
"assets/assets/icons/flutter.jpg": "411c444ee98cdcdd27271889df3c4184",
"assets/assets/icons/heart.png": "02df1256643d82d090584b68aefc8fa2",
"assets/assets/icons/heart_outlined.png": "ee6b0d667f5ff46ad537f3fd9d1b49ca",
"assets/assets/icons/lock.png": "6f778e0a44fad1c3ec3f8a1cdea776bf",
"assets/assets/icons/node.png": "e574769b8ba412b5ebb8ec32f58430ec",
"assets/assets/icons/pause.png": "0c80c090158778215a2bc169bbae50a0",
"assets/assets/icons/Physics.jpg": "c695a0bea739c8e2a448d4ece20651ab",
"assets/assets/icons/play.png": "ce4651efd933241f54ec3858a16b7e1b",
"assets/assets/icons/play_next.png": "a03d35b0ff5c20bfe302d68a76ddbd55",
"assets/assets/icons/play_outlined.png": "26aa3c78fce2fdf8512004803edecc50",
"assets/assets/icons/react.jpg": "73c59bcd1b47d91fe4c71decca19363a",
"assets/assets/icons/second-icon.png": "6095e6b72b7ff8333b69744fac160e6b",
"assets/assets/icons/settings.png": "c98b9135f56eb076eeb995c5b191dfd5",
"assets/assets/icons/settings_outlined.png": "50805a6ec23e0c9fd81c9bfcff40a4c6",
"assets/assets/icons/star.png": "9b16566ce076012da1d126cf1abd9a4d",
"assets/assets/icons/star_outlined.png": "b3bef663a68a16287d4b3a49ae02bed3",
"assets/assets/icons/third-icon.png": "e9331272a2e4e05c1f17f4528dc86311",
"assets/assets/icons/userIMG.jpeg": "342d4c272e0fe9530679a68f175c7cd6",
"assets/assets/icons/userIMGW.jpeg": "c89877f1c3ff73d453540a9036438090",
"assets/assets/icons/welcome.png": "68c6adefcd334f5fa817d5b8df4c9a33",
"assets/FontManifest.json": "5ff2d2c77f408160c21ef4da53e9c8a9",
"assets/fonts/MaterialIcons-Regular.otf": "d1c95265b1e3620788b98e2cb6158bd7",
"assets/NOTICES": "4347931d55f53c18f54dc774ed5d987c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "7030bd5084c284ca224168a317b8f948",
"/": "7030bd5084c284ca224168a317b8f948",
"main.dart.js": "c6ac7fdb411a8009f2fdb35a92539623",
"manifest.json": "37e51c6dde0745dcca3fe8a0017a3db4",
"version.json": "871220eb2c5d8718b54c782f183051d2"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
