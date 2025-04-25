import { d as db } from '../../../chunks/db_ug6_8mX0.mjs';
export { r as renderers } from '../../../chunks/internal_BsTt5pTQ.mjs';

const POST = async ({ cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401
      });
    }
    const user = JSON.parse(userCookie.value);
    const cartItemsResult = await db.execute({
      sql: `
        SELECT 
          ci.id as cart_item_id,
          ci.user_id,
          ci.product_id,
          ci.quantity,
          p.id as product_id,
          p.title,
          p.description,
          p.price,
          p.image,
          p.stock,
          p.user_id as product_user_id
        FROM CartItem ci
        INNER JOIN Product p ON ci.product_id = p.id
        WHERE ci.user_id = ?
      `,
      args: [user.id]
    });
    const cartItems = cartItemsResult.rows;
    for (const item of cartItems) {
      const stock = Number(item.stock);
      const quantity = Number(item.quantity);
      if (stock < quantity) {
        return new Response(JSON.stringify({
          error: "Stock insuficiente para " + item.title
        }), { status: 400 });
      }
    }
    for (const item of cartItems) {
      await db.execute({
        sql: "INSERT INTO Compras (user_id, product_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
        args: [user.id, item.product_id, item.quantity, item.price]
      });
      await db.execute({
        sql: "UPDATE Product SET stock = stock - ? WHERE id = ?",
        args: [item.quantity, item.product_id]
      });
      await db.execute({
        sql: "DELETE FROM CartItem WHERE id = ?",
        args: [item.cart_item_id]
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    });
  } catch (error) {
    console.error("Error en checkout:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
