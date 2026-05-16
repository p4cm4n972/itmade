
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
  },
  {
    "renderMode": 2,
    "redirectTo": "/missions",
    "route": "/offres"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 54686, hash: '59ff6f330d4c09cbd02d4a91007ae6898832594100c997d018f86bbd27330315', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 31922, hash: 'dbe41da01f51a67da955edbe39ca9693251f44799674a27a45f04f298fc8b066', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'confidentialite/index.html': {size: 134014, hash: '1220bba7940176852b4005f301d9e4617984e62030dbdb9ba29d8275c78eb8f9', text: () => import('./assets-chunks/confidentialite_index_html.mjs').then(m => m.default)},
    'consultants/index.html': {size: 168403, hash: '6c7ac35a2db8e84100671b13bf0906df59195c7ca2a1c9445777225da3a1834d', text: () => import('./assets-chunks/consultants_index_html.mjs').then(m => m.default)},
    'entreprises/index.html': {size: 167715, hash: 'fda66861b95f9647075487a6a6825ef3e06be1c31fd8feee0e96206c8fd13b89', text: () => import('./assets-chunks/entreprises_index_html.mjs').then(m => m.default)},
    'cgu/index.html': {size: 131949, hash: 'e1094b19b0583b8cecea594e73c386ebba7308bc8dd1c0fc9b4dbe086878f9d8', text: () => import('./assets-chunks/cgu_index_html.mjs').then(m => m.default)},
    'missions/index.html': {size: 132516, hash: '6e9aa62377d312c848a6144d1a36cd6a5d5fa3274c8181dec2e919e23f08962f', text: () => import('./assets-chunks/missions_index_html.mjs').then(m => m.default)},
    'mentions-legales/index.html': {size: 130683, hash: '20e7687f34ba1812f65b97fa17ed31f84fa9b70986e3eddc74850d386488e6f3', text: () => import('./assets-chunks/mentions-legales_index_html.mjs').then(m => m.default)},
    'index.html': {size: 209081, hash: '1f0246b6756b9eb2e49b5a5376487882640ca964f4fc564966c8e07781d82feb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-AA7NK3QH.css': {size: 24956, hash: 'ys30tc1FcmY', text: () => import('./assets-chunks/styles-AA7NK3QH_css.mjs').then(m => m.default)}
  },
};
