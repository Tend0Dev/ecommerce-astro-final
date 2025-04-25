import { d as db } from '../../../chunks/db_ug6_8mX0.mjs';
export { r as renderers } from '../../../chunks/internal_BsTt5pTQ.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const user = JSON.parse(userCookie.value);
    const formData = await request.formData();
    const productId = formData.get("product_id");
    const quantity = formData.get("quantity");
    if (!productId || !quantity) {
      return new Response(JSON.stringify({ error: "Datos incompletos" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const parsedProductId = parseInt(productId.toString());
    const parsedQuantity = parseInt(quantity.toString());
    if (isNaN(parsedProductId) || isNaN(parsedQuantity)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const existingItemsResult = await db.execute({
      sql: "SELECT * FROM CartItem WHERE user_id = ? AND product_id = ?",
      args: [user.id, parsedProductId]
    });
    const existingItems = existingItemsResult.rows;
    const existingItem = existingItems.length > 0 ? existingItems[0] : null;
    if (existingItem) {
      await db.execute({
        sql: "UPDATE CartItem SET quantity = quantity + ? WHERE id = ?",
        args: [parsedQuantity, existingItem.id]
      });
    } else {
      await db.execute({
        sql: "INSERT INTO CartItem (user_id, product_id, quantity) VALUES (?, ?, ?)",
        args: [user.id, parsedProductId, parsedQuantity]
      });
    }
    const cartCountResult = await db.execute({
      sql: "SELECT SUM(quantity) as total FROM CartItem WHERE user_id = ?",
      args: [user.id]
    });
    const cartCount = Number(cartCountResult.rows[0]?.total || 0);
    return new Response(JSON.stringify({
      success: true,
      cartCount
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
