import type { APIRoute } from "astro";
import { db } from "../../../../lib/db";

export const DELETE: APIRoute = async ({ params, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const itemId = params.id;
    if (!itemId) {
      return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
        status: 400,
      });
    }

    console.log('Intentando eliminar item del carrito con ID:', itemId);

    // Verificar si el item existe antes de eliminarlo
    const checkResult = await db.execute({
      sql: 'SELECT * FROM CartItem WHERE id = ?',
      args: [parseInt(itemId)]
    });

    if (checkResult.rows.length === 0) {
      console.log('Item no encontrado en la base de datos');
      return new Response(JSON.stringify({ error: "Item no encontrado" }), {
        status: 404,
      });
    }

    console.log('Item encontrado, procediendo a eliminar');

    // Eliminar el item del carrito
    await db.execute({
      sql: 'DELETE FROM CartItem WHERE id = ? AND user_id = ?',
      args: [parseInt(itemId), userCookie.value]
    });

    // Obtener el conteo actualizado del carrito
    const cartCountResult = await db.execute({
      sql: 'SELECT SUM(quantity) as total FROM CartItem WHERE user_id = ?',
      args: [userCookie.value]
    });
    
    const cartCount = Number(cartCountResult.rows[0]?.total || 0);

    console.log('Item eliminado correctamente');

    return new Response(JSON.stringify({ 
      success: true,
      cartCount: cartCount
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    return new Response(JSON.stringify({ error: "Error interno", details: String(error) }), {
      status: 500,
    });
  }
}; 