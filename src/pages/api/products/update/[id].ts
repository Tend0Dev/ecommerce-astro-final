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
    const productId = params.id!;
    const { title, description, price, stock, image } = await request.json();

    // Validaciones
    if (typeof price !== 'number' || price < 1) {
      return new Response(JSON.stringify({ error: "El precio debe ser mayor a 0" }), {
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

    // Si el precio nuevo es diferente al actual, guardar el precio actual como precio anterior
    const updateData: any = {
      title,
      description,
      price,
      stock,
      image
    };

    if (price !== product.price) {
      updateData.old_price = product.price;
    }

    // Actualizar producto
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
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error al actualizar producto:', error);
    return new Response(JSON.stringify({ 
      error: "Error interno del servidor",
      details: err.message 
    }), {
      status: 500,
    });
  }
}; 