import { c as createComponent, a as createAstro, r as renderTemplate, b as renderScript, d as renderComponent, F as Fragment, e as renderHead } from './astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { g as getCartCount } from './queries_BON_RnUO.mjs';
/* empty css                           */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  let cartCount = 0;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
      cartCount = await getCartCount(user.id);
    } catch (e) {
      user = null;
    }
  }
  return renderTemplate(_a || (_a = __template(['<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"><\/script>', '</head> <nav data-astro-cid-3ef6ksr2> <div data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2><i class="bi bi-shop" data-astro-cid-3ef6ksr2></i> Angel | Shop</a></div> <ul class="nav-links" data-astro-cid-3ef6ksr2> ', " </ul> </nav> ", " "])), renderHead(), user ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate` <li data-astro-cid-3ef6ksr2> <a href="/carrito/" data-astro-cid-3ef6ksr2> <i class="bi bi-cart-fill" data-astro-cid-3ef6ksr2></i> Carrito <span id="numerito" class="numerito" data-astro-cid-3ef6ksr2>${cartCount}</span> </a> </li> <li class="user-menu" data-astro-cid-3ef6ksr2> <button class="user-btn" data-astro-cid-3ef6ksr2> <i class="bi bi-person-circle" data-astro-cid-3ef6ksr2></i> ${user.username} </button> <ul class="dropdown" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/sell/" data-astro-cid-3ef6ksr2><i class="bi bi-shop" data-astro-cid-3ef6ksr2></i> Vender</a></li> <li data-astro-cid-3ef6ksr2><a href="/mis-productos/" data-astro-cid-3ef6ksr2><i class="bi bi-box-seam" data-astro-cid-3ef6ksr2></i> Mis Productos</a></li> <li data-astro-cid-3ef6ksr2><a href="/mis-compras/" data-astro-cid-3ef6ksr2><i class="bi bi-bag" data-astro-cid-3ef6ksr2></i> Mis Compras</a></li> <li data-astro-cid-3ef6ksr2><a href="/logout/" data-astro-cid-3ef6ksr2><i class="bi bi-box-arrow-right" data-astro-cid-3ef6ksr2></i> Cerrar sesión</a></li> </ul> </li> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate` <li data-astro-cid-3ef6ksr2> <a href="/login/" data-astro-cid-3ef6ksr2> <i class="bi bi-cart-fill" data-astro-cid-3ef6ksr2></i> Carrito <span id="numerito" class="numerito" data-astro-cid-3ef6ksr2>0</span> </a> </li> <li data-astro-cid-3ef6ksr2> <a href="/login/" data-astro-cid-3ef6ksr2> <button data-astro-cid-3ef6ksr2><i class="bi bi-box-arrow-in-right" data-astro-cid-3ef6ksr2></i> iniciar sesión</button> </a> </li> ` })}`, renderScript($$result, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/components/Header.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/components/Header.astro", void 0);

export { $$Header as $ };
