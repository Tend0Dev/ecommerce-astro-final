import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, r as renderTemplate, f as addAttribute } from '../chunks/astro/server_C2wD1PaE.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_3mcUBbRI.mjs';
import { f as getUserOrders } from '../chunks/queries_CK1OoBgf.mjs';
/* empty css                                       */
export { r as renderers } from '../chunks/internal_BsTt5pTQ.mjs';

const $$Astro = createAstro();
const $$MisCompras = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MisCompras;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      user = null;
    }
  }
  if (!user) {
    return Astro2.redirect("/login?message=" + encodeURIComponent("Por favor inicia sesi\xF3n para ver tus compras") + "&type=error");
  }
  const orders = await getUserOrders(user.id);
  return renderTemplate`<html lang="es" data-astro-cid-qu7kkge6> <head><meta charset="UTF-8"><title>Mis Compras</title>${renderComponent($$result, "Header", $$Header, { "data-astro-cid-qu7kkge6": true })}${renderHead()}</head> <body data-astro-cid-qu7kkge6> <div class="contenedor" data-astro-cid-qu7kkge6> <h1 data-astro-cid-qu7kkge6>Mis Compras</h1> ${orders.length === 0 ? renderTemplate`<div class="no-compras" data-astro-cid-qu7kkge6> <i class="bi bi-emoji-frown" data-astro-cid-qu7kkge6></i> <p data-astro-cid-qu7kkge6>Aún no has realizado ninguna compra</p> <a href="/" class="btn-comprar" data-astro-cid-qu7kkge6>Ver productos disponibles</a> </div>` : renderTemplate`<div class="compras-lista" data-astro-cid-qu7kkge6> ${orders.map((order) => renderTemplate`<div class="compra-card" data-astro-cid-qu7kkge6> <div class="compra-header" data-astro-cid-qu7kkge6> <div class="compra-info" data-astro-cid-qu7kkge6> <p class="fecha" data-astro-cid-qu7kkge6>${new Date(order.created_at).toLocaleDateString()}</p> <p class="orden" data-astro-cid-qu7kkge6>Orden #${order.id}</p> <p class="estado" data-astro-cid-qu7kkge6>${order.status}</p> </div> <p class="total" data-astro-cid-qu7kkge6>$${order.total.toFixed(2)}</p> </div> <div class="productos-lista" data-astro-cid-qu7kkge6> ${order.items.map((item) => renderTemplate`<div class="producto-item" data-astro-cid-qu7kkge6> <img${addAttribute(item.product.image, "src")}${addAttribute(item.product.title, "alt")} data-astro-cid-qu7kkge6> <div class="producto-info" data-astro-cid-qu7kkge6> <h3 data-astro-cid-qu7kkge6>${item.product.title}</h3> <p class="cantidad" data-astro-cid-qu7kkge6>Cantidad: ${item.quantity}</p> <p class="precio" data-astro-cid-qu7kkge6>$${item.price.toFixed(2)}</p> </div> </div>`)} </div> </div>`)} </div>`} </div> </body></html>`;
}, "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/mis-compras.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/mis-compras.astro";
const $$url = "/mis-compras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MisCompras,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
