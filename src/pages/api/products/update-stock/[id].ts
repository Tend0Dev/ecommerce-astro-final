import type { APIRoute } from "astro";
import { db } from "../../../../lib/db";
import { getProductById } from "../../../../lib/queries";

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const user = JSON.parse(userCookie.value);
    const productId = params.id;
    if (!productId) {
      return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
        status: 400,
      });
    }

    const { stock } = await request.json();

    if (typeof stock !== 'number' || stock < 0) {
      return new Response(JSON.stringify({ error: "Stock inválido" }), {
        status: 400,
      });
    }

    // Verificar que el producto pertenece al usuario
    const product = await getProductById(parseInt(productId));

    if (!product || product.user_id !== user.id) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    // Actualizar stock
    await db.execute({
      sql: 'UPDATE Product SET stock = ? WHERE id = ?',
      args: [stock, parseInt(productId)]
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}; 