import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, r as renderTemplate } from '../chunks/astro/server_C2wD1PaE.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_3mcUBbRI.mjs';
import { i as createProduct } from '../chunks/queries_CK1OoBgf.mjs';
/* empty css                                */
export { r as renderers } from '../chunks/internal_BsTt5pTQ.mjs';

const $$Astro = createAstro();
const $$Sell = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sell;
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
    return Astro2.redirect("/login?message=" + encodeURIComponent("Por favor inicia sesi\xF3n para vender") + "&type=error");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const priceRaw = formData.get("price")?.toString();
    const image = formData.get("image")?.toString();
    const stockRaw = formData.get("stock")?.toString();
    const oldPriceRaw = formData.get("old_price")?.toString();
    if (title && description && image && priceRaw && stockRaw && user?.id) {
      const price = parseFloat(priceRaw);
      const stock = parseInt(stockRaw);
      const old_price = oldPriceRaw ? parseFloat(oldPriceRaw) : void 0;
      if (!isNaN(price) && !isNaN(stock)) {
        try {
          await createProduct({
            title,
            description,
            price,
            old_price,
            image,
            stock,
            user_id: user.id
          });
          const timestamp = (/* @__PURE__ */ new Date()).getTime();
          return Astro2.redirect(`/?t=${timestamp}`);
        } catch (error) {
          console.error("Error al crear el producto:", error);
        }
      }
    }
    return Astro2.redirect("/sell");
  }
  return renderTemplate`<html lang="es" data-astro-cid-mmmgnzil> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Angel | Shop - Vender</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">${renderComponent($$result, "Header", $$Header, { "data-astro-cid-mmmgnzil": true })}${renderHead()}</head> <body data-astro-cid-mmmgnzil> <main data-astro-cid-mmmgnzil> <h1 class="titulo-principal" data-astro-cid-mmmgnzil>Vender un producto</h1> <div class="contenedor-formulario" data-astro-cid-mmmgnzil> <form method="POST" data-astro-cid-mmmgnzil> <div class="form-group" data-astro-cid-mmmgnzil> <label for="title" data-astro-cid-mmmgnzil>Título</label> <input type="text" id="title" name="title" required data-astro-cid-mmmgnzil> </div> <div class="form-group" data-astro-cid-mmmgnzil> <label for="description" data-astro-cid-mmmgnzil>Descripción</label> <textarea id="description" name="description" required data-astro-cid-mmmgnzil></textarea> </div> <div class="form-group" data-astro-cid-mmmgnzil> <label for="price" data-astro-cid-mmmgnzil>Precio</label> <input type="number" id="price" name="price" step="0.01" min="0" required data-astro-cid-mmmgnzil> </div> <div class="form-group" data-astro-cid-mmmgnzil> <label for="old_price" data-astro-cid-mmmgnzil>Precio anterior (opcional)</label> <input type="number" id="old_price" name="old_price" step="0.01" min="0" data-astro-cid-mmmgnzil> </div> <div class="form-group" data-astro-cid-mmmgnzil> <label for="stock" data-astro-cid-mmmgnzil>Stock disponible</label> <input type="number" id="stock" name="stock" min="0" required data-astro-cid-mmmgnzil> </div> <div class="form-group" data-astro-cid-mmmgnzil> <label for="image" data-astro-cid-mmmgnzil>URL de la imagen del producto</label> <input type="url" id="image" name="image" placeholder="https://ejemplo.com/imagen.jpg" required data-astro-cid-mmmgnzil> <small data-astro-cid-mmmgnzil>Pega aquí la URL de tu imagen (puede ser de cualquier sitio)</small> </div> <button type="submit" class="btn" data-astro-cid-mmmgnzil>Publicar producto</button> </form> </div> </main> </body></html>`;
}, "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/sell.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/ecommerce-astro-final/src/pages/sell.astro";
const $$url = "/sell";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sell,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
