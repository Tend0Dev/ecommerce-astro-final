import { c as createComponent, a as createAstro, r as renderTemplate, g as defineScriptVars, f as addAttribute, e as renderHead, d as renderComponent } from '../../chunks/astro/server_C2wD1PaE.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../../chunks/Header_3mcUBbRI.mjs';
import { a as getProductById } from '../../chunks/queries_CK1OoBgf.mjs';
/* empty css                                   */
export { r as renderers } from '../../chunks/internal_BsTt5pTQ.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const params = Astro2.params;
  const productId = params.id ? parseInt(params.id) : null;
  const product = productId ? await getProductById(productId) : null;
  if (!product) {
    return Astro2.redirect("/404");
  }
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      user = null;
    }
  }
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-mvbiubgv> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' | Angel Shop</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"><\/script>', "", '</head> <body data-astro-cid-mvbiubgv> <main data-astro-cid-mvbiubgv> <div class="producto-detalle" data-astro-cid-mvbiubgv> <div class="producto-imagen" data-astro-cid-mvbiubgv> <img', "", ' data-astro-cid-mvbiubgv> </div> <div class="producto-info" data-astro-cid-mvbiubgv> <h1 data-astro-cid-mvbiubgv>', '</h1> <p class="descripcion" data-astro-cid-mvbiubgv>', '</p> <div class="precio" data-astro-cid-mvbiubgv> <span class="precio-actual" data-astro-cid-mvbiubgv>$', "</span> ", ' </div> <div class="stock" data-astro-cid-mvbiubgv> <span data-astro-cid-mvbiubgv>Stock disponible: ', '</span> </div> <button onclick="addToCart()" class="btn-agregar" data-astro-cid-mvbiubgv> <i class="bi bi-cart-plus" data-astro-cid-mvbiubgv></i> Agregar al carrito\n</button> </div> </div> </main> <script>(function(){', `
    // Funci\xF3n para a\xF1adir al carrito
    async function addToCart() {
      if (!user) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: 1
          }),
        });

        if (response.ok) {
          // Mostrar mensaje de \xE9xito
          Toastify({
            text: "Producto a\xF1adido al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#2ecc71",
          }).showToast();
          
          // Actualizar el contador del carrito en el header
          const numerito = document.getElementById('numerito');
          if (numerito) {
            const currentCount = parseInt(numerito.textContent || '0');
            const newCount = currentCount + 1;
            numerito.textContent = newCount.toString();
            
            // Disparar evento personalizado para actualizar el contador en el header
            const event = new CustomEvent('cartUpdated', { 
              detail: { count: newCount } 
            });
            document.dispatchEvent(event);
          }
        } else {
          const data = await response.json();
          Toastify({
            text: data.error || "Error al a\xF1adir al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e74c3c",
          }).showToast();
        }
      } catch (error) {
        console.error('Error:', error);
        Toastify({
          text: "Error al a\xF1adir al carrito",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#e74c3c",
        }).showToast();
      }
    }
  })();<\/script>  </body> </html>`])), product.title, renderComponent($$result, "Header", $$Header, { "data-astro-cid-mvbiubgv": true }), renderHead(), addAttribute(product.image, "src"), addAttribute(product.title, "alt"), product.title, product.description, product.price.toFixed(2), product.old_price && renderTemplate`<span class="precio-anterior" data-astro-cid-mvbiubgv>$${product.old_price.toFixed(2)}</span>`, product.stock, defineScriptVars({ user, productId }));
}, "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/producto/[id].astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
