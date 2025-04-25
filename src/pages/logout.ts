// src/pages/logout.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("user", { path: "/" });
  return redirect("/");
};
