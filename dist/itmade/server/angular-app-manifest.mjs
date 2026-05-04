
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
    'index.csr.html': {size: 54686, hash: 'd5c962b395f3d916fd23a2968e1bafdd40a58147ac1f95fdb3dda1c8fb06184c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 31922, hash: '3f808c9d1bd3b59f3ca1d3e5e803f3530b4ce4c3be11260f01c816521254a072', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cgu/index.html': {size: 131345, hash: '03fb38d8ff5765a4c43caa7ca2467c497fa8711d3cb52a6d39ddbfde5b832de2', text: () => import('./assets-chunks/cgu_index_html.mjs').then(m => m.default)},
    'confidentialite/index.html': {size: 133410, hash: 'e9c64f5ef9681758e47aad74e6e4eb0844b5a9f0560c8d30718b4464a6083311', text: () => import('./assets-chunks/confidentialite_index_html.mjs').then(m => m.default)},
    'index.html': {size: 208477, hash: '23650a4c44e5c95fabe53e417ae64adeac54c0c95278ffb7ef33af0e8eb28afc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'consultants/index.html': {size: 167799, hash: '8947bee78cbabcfd89368134c0b78fbdabffb8e603fcf67ba81140f4928bb926', text: () => import('./assets-chunks/consultants_index_html.mjs').then(m => m.default)},
    'missions/index.html': {size: 131912, hash: '59f15393d5a5403abc9c0ef70609afbb136c53a0324d8ac50a331133e2f72e30', text: () => import('./assets-chunks/missions_index_html.mjs').then(m => m.default)},
    'mentions-legales/index.html': {size: 130079, hash: '0a7321e53e65800c9dfcf45709e3c54429e6e5939b1bca86510a4e8a7fc9730c', text: () => import('./assets-chunks/mentions-legales_index_html.mjs').then(m => m.default)},
    'entreprises/index.html': {size: 167111, hash: '6cdf53df19c68df04ae144c38cf2149c3c2bd8e8aaa5088f32c50d9935f45ba0', text: () => import('./assets-chunks/entreprises_index_html.mjs').then(m => m.default)},
    'styles-AA7NK3QH.css': {size: 24956, hash: 'ys30tc1FcmY', text: () => import('./assets-chunks/styles-AA7NK3QH_css.mjs').then(m => m.default)}
  },
};
