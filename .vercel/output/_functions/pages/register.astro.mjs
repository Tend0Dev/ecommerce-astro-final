import { c as createComponent, a as createAstro, d as renderComponent, e as renderHead, r as renderTemplate } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/Header_CmSBQoe_.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Register = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const url = new URL(Astro2.request.url);
  const message = url.searchParams.get("message");
  const type = url.searchParams.get("type");
  return renderTemplate`<html lang="es" data-astro-cid-qraosrxq> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Angel | Shop - Registro</title>${renderComponent($$result, "Header", $$Header, { "data-astro-cid-qraosrxq": true })}${renderHead()}</head> <body data-astro-cid-qraosrxq> <div class="auth-container" data-astro-cid-qraosrxq> <div class="auth-form" data-astro-cid-qraosrxq> <h1 class="logo" data-astro-cid-qraosrxq>Angel | Shop</h1> <h2 data-astro-cid-qraosrxq>Crear cuenta</h2> ${message && type === "error" && renderTemplate`<div class="alert-error" data-astro-cid-qraosrxq>${message}</div>`} ${message && type === "success" && renderTemplate`<div class="alert-success" data-astro-cid-qraosrxq>${message}</div>`} <form method="POST" action="/api/register" data-astro-cid-qraosrxq> <div class="form-group" data-astro-cid-qraosrxq> <label for="regUsername" data-astro-cid-qraosrxq>Usuario</label> <input type="text" id="regUsername" name="username" required data-astro-cid-qraosrxq> </div> <div class="form-group" data-astro-cid-qraosrxq> <label for="regEmail" data-astro-cid-qraosrxq>Correo electrónico</label> <input type="email" id="regEmail" name="email" required data-astro-cid-qraosrxq> </div> <div class="form-group" data-astro-cid-qraosrxq> <label for="regPassword" data-astro-cid-qraosrxq>Contraseña</label> <input type="password" id="regPassword" name="password" required data-astro-cid-qraosrxq> </div> <button type="submit" class="btn" data-astro-cid-qraosrxq>Registrarse</button> </form> <div class="auth-footer" data-astro-cid-qraosrxq> <p data-astro-cid-qraosrxq>Ya tienes cuenta? <a href="/login/" data-astro-cid-qraosrxq>Inicia sesión aquí</a></p> <p data-astro-cid-qraosrxq><a href="/" data-astro-cid-qraosrxq>Volver a la tienda</a></p> </div> </div> </div> </body></html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/register.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
