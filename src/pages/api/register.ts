import type { APIRoute } from "astro";
import { db } from "../../lib/db";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/register?message=Campos%20inválidos&type=error'
      }
    });
  }

  try {
    // Verificar si el email ya existe
    const existingUsers = await db.execute(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    if (existingUsers.rows.length > 0) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/register?message=El%20correo%20ya%20existe&type=error'
        }
      });
    }

    // Insertar nuevo usuario
    const result = await db.execute(
      "INSERT INTO User (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    const userId = result.lastInsertRowid;
    
    if (userId !== undefined && userId !== null) {
      cookies.set("user", JSON.stringify({
        id: Number(userId),
        username,
        email
      }), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/?message=Registro%20exitoso&type=success'
        }
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/register?message=Error%20al%20registrar&type=error'
      }
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/register?message=Error%20al%20registrar&type=error'
      }
    });
  }
};