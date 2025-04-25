import { c as createComponent, a as createAstro, e as renderHead, r as renderTemplate } from '../chunks/astro/server_G6lzf5hl.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const url = new URL(Astro2.request.url);
  const message = url.searchParams.get("message");
  const type = url.searchParams.get("type");
  return renderTemplate`<html lang="es" data-astro-cid-sgpqyurt> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Angel | Shop - Iniciar sesión</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">${renderHead()}</head> <body data-astro-cid-sgpqyurt> <div class="auth-container" data-astro-cid-sgpqyurt> <div class="auth-form" data-astro-cid-sgpqyurt> <h1 class="logo" data-astro-cid-sgpqyurt>Angel | Shop</h1> <h2 data-astro-cid-sgpqyurt>Iniciar sesión</h2> ${message && type === "error" && renderTemplate`<div class="alert-error" data-astro-cid-sgpqyurt>${message}</div>`} ${message && type === "success" && renderTemplate`<div class="alert-success" data-astro-cid-sgpqyurt>${message}</div>`} <form method="POST" action="/api/login" data-astro-cid-sgpqyurt> <div class="form-group" data-astro-cid-sgpqyurt> <label for="email" data-astro-cid-sgpqyurt>Correo electrónico</label> <input type="email" id="email" name="email" required data-astro-cid-sgpqyurt> </div> <div class="form-group" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Contraseña</label> <input type="password" id="password" name="password" required data-astro-cid-sgpqyurt> </div> <button type="submit" class="btn" data-astro-cid-sgpqyurt>Iniciar sesión</button> </form> <div class="auth-footer" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>No tienes cuenta? <a href="/register/" data-astro-cid-sgpqyurt>Regístrate aquí</a></p> <p data-astro-cid-sgpqyurt><a href="/" data-astro-cid-sgpqyurt>Volver a la tienda</a></p> </div> </div> </div> </body></html>`;
}, "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/login.astro", void 0);

const $$file = "C:/Users/tendo/OneDrive/Desktop/astro-ecommerce/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
