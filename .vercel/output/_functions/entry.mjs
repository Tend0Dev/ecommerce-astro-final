import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DGRxFlJB.mjs';
import { manifest } from './manifest_aGVSUXbH.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/cart/add.astro.mjs');
const _page2 = () => import('./pages/api/cart/checkout.astro.mjs');
const _page3 = () => import('./pages/api/cart/clear.astro.mjs');
const _page4 = () => import('./pages/api/cart/remove/_id_.astro.mjs');
const _page5 = () => import('./pages/api/cart/update/_id_.astro.mjs');
const _page6 = () => import('./pages/api/debug/check-cart-table.astro.mjs');
const _page7 = () => import('./pages/api/login.astro.mjs');
const _page8 = () => import('./pages/api/products/update/_id_.astro.mjs');
const _page9 = () => import('./pages/api/products/update-stock/_id_.astro.mjs');
const _page10 = () => import('./pages/api/register.astro.mjs');
const _page11 = () => import('./pages/carrito.astro.mjs');
const _page12 = () => import('./pages/checkout.astro.mjs');
const _page13 = () => import('./pages/compra-exitosa.astro.mjs');
const _page14 = () => import('./pages/login.astro.mjs');
const _page15 = () => import('./pages/logout.astro.mjs');
const _page16 = () => import('./pages/mis-compras.astro.mjs');
const _page17 = () => import('./pages/mis-productos.astro.mjs');
const _page18 = () => import('./pages/producto/_id_/editar.astro.mjs');
const _page19 = () => import('./pages/producto/_id_.astro.mjs');
const _page20 = () => import('./pages/register.astro.mjs');
const _page21 = () => import('./pages/sell.astro.mjs');
const _page22 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/cart/add.ts", _page1],
    ["src/pages/api/cart/checkout.ts", _page2],
    ["src/pages/api/cart/clear.ts", _page3],
    ["src/pages/api/cart/remove/[id].ts", _page4],
    ["src/pages/api/cart/update/[id].ts", _page5],
    ["src/pages/api/debug/check-cart-table.ts", _page6],
    ["src/pages/api/login.ts", _page7],
    ["src/pages/api/products/update/[id].ts", _page8],
    ["src/pages/api/products/update-stock/[id].ts", _page9],
    ["src/pages/api/register.ts", _page10],
    ["src/pages/carrito.astro", _page11],
    ["src/pages/checkout.astro", _page12],
    ["src/pages/compra-exitosa.astro", _page13],
    ["src/pages/login.astro", _page14],
    ["src/pages/logout.ts", _page15],
    ["src/pages/mis-compras.astro", _page16],
    ["src/pages/mis-productos.astro", _page17],
    ["src/pages/producto/[id]/editar.astro", _page18],
    ["src/pages/producto/[id].astro", _page19],
    ["src/pages/register.astro", _page20],
    ["src/pages/sell.astro", _page21],
    ["src/pages/index.astro", _page22]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ab392718-2b74-4ebf-b121-d22eec21e6f9",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
