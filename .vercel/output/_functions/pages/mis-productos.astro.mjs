import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, b as renderScript, r as renderTemplate, f as addAttribute } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_CmSBQoe_.mjs';
import { h as getUserProducts } from '../chunks/queries_BON_RnUO.mjs';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$MisProductos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MisProductos;
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
    return Astro2.redirect("/login?message=" + encodeURIComponent("Por favor inicia sesi\xF3n para ver tus productos") + "&type=error");
  }
  const products = await getUserProducts(user.id);
  return renderTemplate`<html lang="es" data-astro-cid-ivmbp3zf> <head><meta charset="UTF-8"><title>Mis Productos</title>${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ivmbp3zf": true })}${renderHead()}</head> <body data-astro-cid-ivmbp3zf> <div class="contenedor" data-astro-cid-ivmbp3zf> <h1 data-astro-cid-ivmbp3zf>Mis Productos</h1> ${products.length === 0 ? renderTemplate`<div class="no-productos" data-astro-cid-ivmbp3zf> <i class="bi bi-emoji-frown" data-astro-cid-ivmbp3zf></i> <p data-astro-cid-ivmbp3zf>Aún no has publicado ningún producto</p> <a href="/sell/" class="btn-publicar" data-astro-cid-ivmbp3zf>Publicar mi primer producto</a> </div>` : renderTemplate`<div class="productos-grid" data-astro-cid-ivmbp3zf> ${products.map((product) => renderTemplate`<div class="producto-card"${addAttribute(product.id, "data-id")} data-astro-cid-ivmbp3zf> <div class="stock-indicator"${addAttribute(product.stock > 0 ? "in-stock" : "out-stock", "data-stock")} data-astro-cid-ivmbp3zf> ${product.stock > 0 ? renderTemplate`<i class="bi bi-check-circle-fill" data-astro-cid-ivmbp3zf></i>` : renderTemplate`<i class="bi bi-x-circle-fill" data-astro-cid-ivmbp3zf></i>`} <span data-astro-cid-ivmbp3zf>${product.stock > 0 ? "En stock" : "Sin stock"}</span> </div> <img${addAttribute(product.image, "src")}${addAttribute(product.title, "alt")} data-astro-cid-ivmbp3zf> <div class="producto-info" data-astro-cid-ivmbp3zf> <h3 data-astro-cid-ivmbp3zf>${product.title}</h3> <p class="precio" data-astro-cid-ivmbp3zf>$${product.price.toFixed(2)}</p> <div class="stock-control" data-astro-cid-ivmbp3zf> <div class="stock-row" data-astro-cid-ivmbp3zf> <p class="stock" data-astro-cid-ivmbp3zf>Stock actual:</p> <div class="stock-buttons" data-astro-cid-ivmbp3zf> <button class="btn-stock restar"${addAttribute(product.stock <= 0, "disabled")} data-astro-cid-ivmbp3zf> <i class="bi bi-dash" data-astro-cid-ivmbp3zf></i> </button> <span class="stock-cantidad" data-astro-cid-ivmbp3zf>${product.stock}</span> <button class="btn-stock sumar" data-astro-cid-ivmbp3zf> <i class="bi bi-plus" data-astro-cid-ivmbp3zf></i> </button> </div> </div> </div> <div class="acciones-producto" data-astro-cid-ivmbp3zf> <a${addAttribute(`/producto/${product.id}/editar`, "href")} class="btn-editar" data-astro-cid-ivmbp3zf> <i class="bi bi-pencil" data-astro-cid-ivmbp3zf></i> Editar
</a> <button class="btn-eliminar"${addAttribute(product.id, "data-id")} data-astro-cid-ivmbp3zf> <i class="bi bi-trash" data-astro-cid-ivmbp3zf></i> Eliminar
</button> </div> </div> </div>`)} </div>`} </div> ${renderScript($$result, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/mis-productos.astro?astro&type=script&index=0&lang.ts")}  </body> </html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/mis-productos.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/mis-productos.astro";
const $$url = "/mis-productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MisProductos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
