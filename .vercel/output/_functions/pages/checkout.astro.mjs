import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, f as addAttribute, b as renderScript, r as renderTemplate } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_CmSBQoe_.mjs';
import { b as getCartWithProducts } from '../chunks/queries_BON_RnUO.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  let cartItems = [];
  let total = 0;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
      cartItems = await getCartWithProducts(user.id);
      total = cartItems.reduce((sum, item) => sum + item.Product.price * item.CartItem.quantity, 0);
    } catch (e) {
      user = null;
    }
  }
  if (!user) {
    return Astro2.redirect("/login?message=" + encodeURIComponent("Por favor inicia sesi\xF3n para realizar la compra") + "&type=error");
  }
  if (cartItems.length === 0) {
    return Astro2.redirect("/carrito?message=" + encodeURIComponent("Tu carrito est\xE1 vac\xEDo") + "&type=error");
  }
  return renderTemplate`<html lang="es" data-astro-cid-ojox7d5b> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Checkout | Angel Shop</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ojox7d5b": true })}${renderHead()}</head> <body data-astro-cid-ojox7d5b> <main data-astro-cid-ojox7d5b> <h2 class="titulo-principal" data-astro-cid-ojox7d5b>Finalizar Compra</h2> <div class="checkout-container" data-astro-cid-ojox7d5b> <div class="resumen-pedido" data-astro-cid-ojox7d5b> <h3 data-astro-cid-ojox7d5b>Resumen del Pedido</h3> <div class="productos-lista" data-astro-cid-ojox7d5b> ${cartItems.map((item) => renderTemplate`<div class="producto-item" data-astro-cid-ojox7d5b> <img${addAttribute(item.Product.image, "src")}${addAttribute(item.Product.title, "alt")} data-astro-cid-ojox7d5b> <div class="producto-detalles" data-astro-cid-ojox7d5b> <h4 data-astro-cid-ojox7d5b>${item.Product.title}</h4> <p data-astro-cid-ojox7d5b>Cantidad: ${item.CartItem.quantity}</p> <p class="precio" data-astro-cid-ojox7d5b>$${(item.Product.price * item.CartItem.quantity).toFixed(2)}</p> </div> </div>`)} </div> <div class="total" data-astro-cid-ojox7d5b> <h4 data-astro-cid-ojox7d5b>Total</h4> <p class="precio-total" data-astro-cid-ojox7d5b>$${total.toFixed(2)}</p> </div> </div> <div class="formulario-pago" data-astro-cid-ojox7d5b> <h3 data-astro-cid-ojox7d5b>Información de Pago</h3> <form id="checkout-form" data-astro-cid-ojox7d5b> <div class="form-group" data-astro-cid-ojox7d5b> <label for="nombre" data-astro-cid-ojox7d5b>Nombre completo</label> <input type="text" id="nombre" name="nombre" required data-astro-cid-ojox7d5b> </div> <div class="form-group" data-astro-cid-ojox7d5b> <label for="email" data-astro-cid-ojox7d5b>Email</label> <input type="email" id="email" name="email"${addAttribute(user.email, "value")} required data-astro-cid-ojox7d5b> </div> <div class="form-group" data-astro-cid-ojox7d5b> <label for="direccion" data-astro-cid-ojox7d5b>Dirección de envío</label> <textarea id="direccion" name="direccion" required data-astro-cid-ojox7d5b></textarea> </div> <div class="form-group" data-astro-cid-ojox7d5b> <label for="tarjeta" data-astro-cid-ojox7d5b>Número de tarjeta</label> <input type="text" id="tarjeta" name="tarjeta" pattern="[0-9]{16}" maxlength="16" required data-astro-cid-ojox7d5b> </div> <div class="form-row" data-astro-cid-ojox7d5b> <div class="form-group" data-astro-cid-ojox7d5b> <label for="vencimiento" data-astro-cid-ojox7d5b>Fecha de vencimiento</label> <input type="text" id="vencimiento" name="vencimiento" placeholder="MM/AA" pattern="[0-9]{2}/[0-9]{2}" maxlength="5" required data-astro-cid-ojox7d5b> </div> <div class="form-group" data-astro-cid-ojox7d5b> <label for="cvv" data-astro-cid-ojox7d5b>CVV</label> <input type="text" id="cvv" name="cvv" pattern="[0-9]{3,4}" maxlength="4" required data-astro-cid-ojox7d5b> </div> </div> <button type="submit" class="btn-comprar" data-astro-cid-ojox7d5b> <i class="bi bi-lock-fill" data-astro-cid-ojox7d5b></i> Pagar $${total.toFixed(2)} </button> </form> </div> </div> </main> ${renderScript($$result, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/checkout.astro?astro&type=script&index=0&lang.ts")}  </body> </html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/checkout.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
