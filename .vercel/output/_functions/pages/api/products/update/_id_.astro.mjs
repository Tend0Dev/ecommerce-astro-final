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
    const { title, description, price, stock, image } = await request.json();
    if (typeof price !== "number" || price < 1) {
      return new Response(JSON.stringify({ error: "El precio debe ser mayor a 0" }), {
        status: 400
      });
    }
    const product = await getProductById(parseInt(productId));
    if (!product || product.user_id !== user.id) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401
      });
    }
    const updateData = {
      title,
      description,
      price,
      stock,
      image
    };
    if (price !== product.price) {
      updateData.old_price = product.price;
    }
    await db.execute({
      sql: `
        UPDATE Product 
        SET title = ?, description = ?, price = ?, stock = ?, image = ?, old_price = ?
        WHERE id = ?
      `,
      args: [
        title,
        description,
        price,
        stock,
        image,
        price !== product.price ? product.price : product.old_price,
        parseInt(productId)
      ]
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Producto actualizado correctamente"
    }), {
      status: 200
    });
  } catch (error) {
    const err = error;
    console.error("Error al actualizar producto:", error);
    return new Response(JSON.stringify({
      error: "Error interno del servidor",
      details: err.message
    }), {
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
