import { d as db } from '../../../chunks/db_DsEsNE26.mjs';
export { renderers } from '../../../renderers.mjs';

const DELETE = async ({ cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401
      });
    }
    const user = JSON.parse(userCookie.value);
    await db.execute({
      sql: "DELETE FROM CartItem WHERE user_id = ?",
      args: [user.id]
    });
    return new Response(JSON.stringify({
      success: true,
      cartCount: 0
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
