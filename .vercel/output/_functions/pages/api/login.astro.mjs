import { d as db } from '../../chunks/db_ug6_8mX0.mjs';
export { r as renderers } from '../../chunks/internal_BsTt5pTQ.mjs';

const POST = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `/login?message=${encodeURIComponent("Campos inválidos")}&type=error`
      }
    });
  }
  try {
    const result = await db.execute(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      cookies.set("user", JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/"
        }
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `/login?message=${encodeURIComponent("Correo o contraseña incorrectos")}&type=error`
      }
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `/login?message=${encodeURIComponent("Error al iniciar sesión")}&type=error`
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
