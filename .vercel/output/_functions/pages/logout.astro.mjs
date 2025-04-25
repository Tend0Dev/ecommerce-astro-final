export { renderers } from '../renderers.mjs';

const GET = async ({ redirect, cookies }) => {
  cookies.delete("user", { path: "/" });
  return redirect("/");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
