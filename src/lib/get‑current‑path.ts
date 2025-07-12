import { headers } from "next/headers";

export async function getCurrentPath(): Promise<string> {
  const h = await headers();
  return h.get("x-pathname") ?? h.get("next-url") ?? "/";
}
