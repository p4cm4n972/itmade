
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
    'index.csr.html': {size: 54740, hash: '6cea1499c822851bc6bb817265fd0cf723c4b709f6077b606519cfb137917fab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 31976, hash: 'ae6c7bcea653750e6af2829612188e0d42942371476e017e10e9394bb3432394', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cgu/index.html': {size: 131267, hash: '4d1d287bedb7e541ce42d861779ea55a108ca8d355d2dde9bad43e3b6113d1a1', text: () => import('./assets-chunks/cgu_index_html.mjs').then(m => m.default)},
    'entreprises/index.html': {size: 166963, hash: '6475a3e79867ce39c356d3a6620e7c6b3248f6df2046457f694e8e897e356c75', text: () => import('./assets-chunks/entreprises_index_html.mjs').then(m => m.default)},
    'consultants/index.html': {size: 167601, hash: '6e2a9731884f9541e5d73f5d88ace940c8723678d60677ac2dd261b950d25df9', text: () => import('./assets-chunks/consultants_index_html.mjs').then(m => m.default)},
    'index.html': {size: 208315, hash: 'a03ebeaa1dc17ae22b0fb402cd3b3fb06cc8faac0e0bae3d41716c7df51f9b08', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'missions/index.html': {size: 131741, hash: '938f92ccd0cf33e2428bc976d6ef904a48495f6ac40f50b38b37f2648cde168e', text: () => import('./assets-chunks/missions_index_html.mjs').then(m => m.default)},
    'confidentialite/index.html': {size: 133413, hash: '1046754535a9ee864b8ea332cddc3560a15b6a1ffb0b58d38b6fbf5d681f589f', text: () => import('./assets-chunks/confidentialite_index_html.mjs').then(m => m.default)},
    'mentions-legales/index.html': {size: 129899, hash: 'ce370a7851cdacc94dd0d11739ea588ad251a7895e35481dc99366128268c082', text: () => import('./assets-chunks/mentions-legales_index_html.mjs').then(m => m.default)},
    'styles-AA7NK3QH.css': {size: 24956, hash: 'ys30tc1FcmY', text: () => import('./assets-chunks/styles-AA7NK3QH_css.mjs').then(m => m.default)}
  },
};
