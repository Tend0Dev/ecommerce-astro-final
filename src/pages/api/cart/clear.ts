import type { APIRoute } from "astro";
import { db } from "../../../lib/db";

export const DELETE: APIRoute = async ({ cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const user = JSON.parse(userCookie.value);

    // Eliminar todos los items del carrito del usuario
    await db.execute({
      sql: 'DELETE FROM CartItem WHERE user_id = ?',
      args: [user.id]
    });

    return new Response(JSON.stringify({ 
      success: true,
      cartCount: 0
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}; 