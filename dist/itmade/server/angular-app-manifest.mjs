
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/entreprises"
  },
  {
    "renderMode": 2,
    "route": "/consultants"
  },
  {
    "renderMode": 2,
    "route": "/missions"
  },
  {
    "renderMode": 2,
    "route": "/mentions-legales"
  },
  {
    "renderMode": 2,
    "route": "/confidentialite"
  },
  {
    "renderMode": 2,
    "route": "/cgu"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 54740, hash: '56e0e8c50c0e9c0f6d5a155fee336da9e33ae83fb41c7d7314b6c6c5f0a403f2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 31976, hash: 'b6839acceb7eaf54bedb84528c6f0b4031d79b50be9ca48ee649e62c99d4d5fc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'confidentialite/index.html': {size: 133413, hash: '4798cbaa82019b366d049dec77a345209e98368ba00c129acf7b65677dbae872', text: () => import('./assets-chunks/confidentialite_index_html.mjs').then(m => m.default)},
    'entreprises/index.html': {size: 166963, hash: '73391efc65e8803e9b3b2e42fe9dea732193ca69492a22207ccf82b557e2ba58', text: () => import('./assets-chunks/entreprises_index_html.mjs').then(m => m.default)},
    'index.html': {size: 208316, hash: 'dc92c54285d72c084c71618f11533c50bcbed9ed57da7f78fed6f38438443be3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'consultants/index.html': {size: 167601, hash: '768e636fda72b70b7478fd7c29266a47af1e667300675507818cd0fe3401712c', text: () => import('./assets-chunks/consultants_index_html.mjs').then(m => m.default)},
    'mentions-legales/index.html': {size: 129899, hash: '3bc313fcf1fd175fc62b783ba3f316ffea943fb94f77ea840a581e9b8bb91d48', text: () => import('./assets-chunks/mentions-legales_index_html.mjs').then(m => m.default)},
    'missions/index.html': {size: 131741, hash: '328e3f63d8497d42cfaa80f2997a52312ab0bcd24d9e96e5b36dc1ffc32e4440', text: () => import('./assets-chunks/missions_index_html.mjs').then(m => m.default)},
    'cgu/index.html': {size: 131267, hash: '591ea7c549201b4af6138c953ae2486519b2e7475741ef5c31921274fa4cf430', text: () => import('./assets-chunks/cgu_index_html.mjs').then(m => m.default)},
    'styles-AA7NK3QH.css': {size: 24956, hash: 'ys30tc1FcmY', text: () => import('./assets-chunks/styles-AA7NK3QH_css.mjs').then(m => m.default)}
  },
};
