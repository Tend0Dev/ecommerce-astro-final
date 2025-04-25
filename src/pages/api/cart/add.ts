import type { APIRoute } from "astro";
import { db } from "../../../lib/db";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
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
          "Content-Type": "application/json",
        },
      });
    }

    const parsedProductId = parseInt(productId.toString());
    const parsedQuantity = parseInt(quantity.toString());

    if (isNaN(parsedProductId) || isNaN(parsedQuantity)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Verificar si el producto ya existe en el carrito
    const existingItemsResult = await db.execute({
      sql: 'SELECT * FROM CartItem WHERE user_id = ? AND product_id = ?',
      args: [user.id, parsedProductId]
    });

    const existingItems = existingItemsResult.rows;
    const existingItem = existingItems.length > 0 ? existingItems[0] : null;

    if (existingItem) {
      // Actualizar cantidad si el producto ya está en el carrito
      await db.execute({
        sql: 'UPDATE CartItem SET quantity = quantity + ? WHERE id = ?',
        args: [parsedQuantity, existingItem.id]
      });
    } else {
      // Insertar nuevo item en el carrito
      await db.execute({
        sql: 'INSERT INTO CartItem (user_id, product_id, quantity) VALUES (?, ?, ?)',
        args: [user.id, parsedProductId, parsedQuantity]
      });
    }

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
    console.error('Error al agregar al carrito:', error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}; 