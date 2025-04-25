import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderScript, r as renderTemplate, f as addAttribute, d as renderComponent, e as renderHead } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_CmSBQoe_.mjs';
import 'clsx';
import { j as getProducts } from '../chunks/queries_BON_RnUO.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Products;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      user = null;
    }
  }
  const products = await getProducts(user?.id);
  return renderTemplate`${maybeRenderHead()}<h2 class="titulo-seccion" data-astro-cid-qnwxz4mj>Todos los Productos</h2> ${products.length === 0 ? renderTemplate`<div class="no-productos" data-astro-cid-qnwxz4mj> <i class="bi bi-emoji-frown" data-astro-cid-qnwxz4mj></i> <p data-astro-cid-qnwxz4mj>No hay productos disponibles en este momento.</p> </div>` : renderTemplate`<div class="contenedor-productos" data-astro-cid-qnwxz4mj> ${products.map((product) => renderTemplate`<div class="tarjeta-producto" data-astro-cid-qnwxz4mj> <img${addAttribute(product.image || "/placeholder.jpg", "src")}${addAttribute(product.title, "alt")} width="300" height="200" loading="lazy" class="imagen-producto" data-astro-cid-qnwxz4mj> <div class="info-producto" data-astro-cid-qnwxz4mj> <h3 class="titulo-producto" data-astro-cid-qnwxz4mj>${product.title}</h3> <p class="descripcion-producto" data-astro-cid-qnwxz4mj>${product.description || "Sin descripci\xF3n"}</p> <div class="precio-container" data-astro-cid-qnwxz4mj> <p class="precio-producto" data-astro-cid-qnwxz4mj>$${product.price.toFixed(2)}</p> ${product.old_price && product.old_price > product.price && renderTemplate`<p class="precio-anterior" data-astro-cid-qnwxz4mj>$${product.old_price.toFixed(2)}</p>`} </div> <div class="stock-action-container" data-astro-cid-qnwxz4mj> <p class="stock-disponible" data-astro-cid-qnwxz4mj>disponibles: ${product.stock}</p> ${user ? renderTemplate`<form method="POST" action="/api/cart/add" class="add-to-cart-form" data-astro-cid-qnwxz4mj> <input type="hidden" name="product_id"${addAttribute(product.id, "value")} data-astro-cid-qnwxz4mj> <input type="hidden" name="quantity" value="1" data-astro-cid-qnwxz4mj> <button type="submit" class="agregar-carrito" data-astro-cid-qnwxz4mj> <i class="bi bi-cart-plus" data-astro-cid-qnwxz4mj></i> Agregar
</button> </form>` : renderTemplate`<a href="/login/" class="boton-login" data-astro-cid-qnwxz4mj> <button class="agregar-carrito" data-astro-cid-qnwxz4mj> <i class="bi bi-cart-plus" data-astro-cid-qnwxz4mj></i> Agregar
</button> </a>`} </div> </div> </div>`)} </div>`} ${renderScript($$result, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/components/Products.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/components/Products.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Angel | Shop </title>${renderComponent($$result, "Header", $$Header, {})}${renderHead()}</head> <body> ${renderComponent($$result, "Products", $$Products, {})} </body></html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/index.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
