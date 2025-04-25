import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, f as addAttribute, r as renderTemplate } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_CmSBQoe_.mjs';
import { b as getCartWithProducts, d as createOrder, e as clearCart } from '../chunks/queries_BON_RnUO.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$CompraExitosa = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CompraExitosa;
  const userCookie = Astro2.cookies.get("user");
  let user = null;
  let cartItems = [];
  let total = 0;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
      cartItems = await getCartWithProducts(user.id);
      total = cartItems.reduce((sum, item) => sum + item.Product.price * item.CartItem.quantity, 0);
      if (cartItems.length > 0) {
        await createOrder({
          user_id: user.id,
          total,
          items: cartItems.map((item) => ({
            product_id: item.Product.id,
            quantity: item.CartItem.quantity,
            price: item.Product.price
          }))
        });
      }
      await clearCart(user.id);
    } catch (e) {
      console.error("Error al procesar la compra:", e);
      user = null;
    }
  }
  if (!user) {
    return Astro2.redirect("/login?message=" + encodeURIComponent("Por favor inicia sesi\xF3n para ver tu compra") + "&type=error");
  }
  return renderTemplate`<html lang="es" data-astro-cid-6jhnmnh6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>¡Compra Exitosa! | Angel Shop</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">${renderComponent($$result, "Header", $$Header, { "data-astro-cid-6jhnmnh6": true })}${renderHead()}</head> <body data-astro-cid-6jhnmnh6> <main data-astro-cid-6jhnmnh6> <div class="compra-exitosa" data-astro-cid-6jhnmnh6> <div class="icono-exito" data-astro-cid-6jhnmnh6> <i class="bi bi-check-circle-fill" data-astro-cid-6jhnmnh6></i> </div> <h2 data-astro-cid-6jhnmnh6>¡Compra Exitosa!</h2> <p data-astro-cid-6jhnmnh6>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p> <div class="detalles-compra" data-astro-cid-6jhnmnh6> <h3 data-astro-cid-6jhnmnh6>Detalles de tu compra</h3> <div class="productos-comprados" data-astro-cid-6jhnmnh6> ${cartItems.map((item) => renderTemplate`<div class="producto-item" data-astro-cid-6jhnmnh6> <img${addAttribute(item.Product.image, "src")}${addAttribute(item.Product.title, "alt")} data-astro-cid-6jhnmnh6> <div class="producto-detalles" data-astro-cid-6jhnmnh6> <h4 data-astro-cid-6jhnmnh6>${item.Product.title}</h4> <p data-astro-cid-6jhnmnh6>Cantidad: ${item.CartItem.quantity}</p> <p class="precio" data-astro-cid-6jhnmnh6>$${(item.Product.price * item.CartItem.quantity).toFixed(2)}</p> </div> </div>`)} </div> <div class="total" data-astro-cid-6jhnmnh6> <h4 data-astro-cid-6jhnmnh6>Total pagado</h4> <p class="precio-total" data-astro-cid-6jhnmnh6>$${total.toFixed(2)}</p> </div> </div> <div class="acciones" data-astro-cid-6jhnmnh6> <a href="/mis-compras" class="btn-ver-compras" data-astro-cid-6jhnmnh6> <i class="bi bi-bag" data-astro-cid-6jhnmnh6></i> Ver mis compras
</a> <a href="/" class="btn-seguir-comprando" data-astro-cid-6jhnmnh6> <i class="bi bi-shop" data-astro-cid-6jhnmnh6></i> Seguir comprando
</a> </div> </div> </main>  </body> </html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/compra-exitosa.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/compra-exitosa.astro";
const $$url = "/compra-exitosa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CompraExitosa,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
