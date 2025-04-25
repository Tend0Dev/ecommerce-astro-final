import { c as checkCartItemTable } from '../../../chunks/queries_CK1OoBgf.mjs';
export { r as renderers } from '../../../chunks/internal_BsTt5pTQ.mjs';

const GET = async () => {
  try {
    const tableExists = await checkCartItemTable();
    if (!tableExists) {
      return new Response(JSON.stringify({
        error: "La tabla CartItem no existe en la base de datos",
        solution: "Crear la tabla CartItem con la estructura correcta"
      }), {
        status: 404
      });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "La tabla CartItem existe en la base de datos"
    }), {
      status: 200
    });
  } catch (error) {
    console.error("Error al verificar la tabla CartItem:", error);
    return new Response(JSON.stringify({
      error: "Error interno",
      details: String(error)
    }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
