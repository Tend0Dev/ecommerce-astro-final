import { d as db } from '../../../../chunks/db_ug6_8mX0.mjs';
import { a as getProductById } from '../../../../chunks/queries_CK1OoBgf.mjs';
export { r as renderers } from '../../../../chunks/internal_BsTt5pTQ.mjs';

const PATCH = async ({ params, request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401
      });
    }
    const user = JSON.parse(userCookie.value);
    const productId = params.id;
    if (!productId) {
      return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
        status: 400
      });
    }
    const { stock } = await request.json();
    if (typeof stock !== "number" || stock < 0) {
      return new Response(JSON.stringify({ error: "Stock inválido" }), {
        status: 400
      });
    }
    const product = await getProductById(parseInt(productId));
    if (!product || product.user_id !== user.id) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401
      });
    }
    await db.execute({
      sql: "UPDATE Product SET stock = ? WHERE id = ?",
      args: [stock, parseInt(productId)]
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
