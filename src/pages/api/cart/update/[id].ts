import type { APIRoute } from "astro";
import { db } from "../../../../lib/db";

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const user = JSON.parse(userCookie.value);
    const itemId = params.id;
    
    if (!itemId) {
      return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
        status: 400,
      });
    }

    // Verificar si el item existe y pertenece al usuario
    const checkResult = await db.execute({
      sql: 'SELECT ci.*, p.stock FROM CartItem ci INNER JOIN Product p ON ci.product_id = p.id WHERE ci.id = ? AND ci.user_id = ?',
      args: [parseInt(itemId), user.id]
    });

    if (checkResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Item no encontrado o no autorizado" }), {
        status: 404,
      });
    }

    const data = await request.json();
    const { quantity } = data;
    const currentItem = checkResult.rows[0];
    const stock = Number(currentItem.stock) || 0;

    // Validar la cantidad
    if (!quantity || quantity < 1) {
      return new Response(JSON.stringify({ error: "Cantidad inválida" }), {
        status: 400,
      });
    }

    // Verificar que la cantidad no exceda el stock
    if (quantity > stock) {
      return new Response(JSON.stringify({ error: "Cantidad excede el stock disponible" }), {
        status: 400,
      });
    }

    // Actualizar la cantidad
    await db.execute({
      sql: 'UPDATE CartItem SET quantity = ? WHERE id = ? AND user_id = ?',
      args: [quantity, parseInt(itemId), user.id]
    });

    // Obtener el conteo actualizado del carrito
    const cartCountResult = await db.execute({
      sql: 'SELECT SUM(quantity) as total FROM CartItem WHERE user_id = ?',
      args: [user.id]
    });
    
    const cartCount = Number(cartCountResult.rows[0]?.total || 0);

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
    console.error('Error al actualizar el carrito:', error);
    return new Response(JSON.stringify({ 
      error: "Error interno",
      details: error instanceof Error ? error.message : "Error desconocido"
    }), {
      status: 500,
    });
  }
}; 