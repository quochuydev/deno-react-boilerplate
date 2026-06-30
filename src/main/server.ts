import { renderIndexHtml } from "./html.ts";
import { bridgeSource } from "../preload/bridge.ts";
import { dispatch } from "./ipc/router.ts";

const version = Deno.desktopVersion ?? "dev";

// Renderer assets produced by `deno task build:renderer` (esbuild). They are
// read at module load — the same static `new URL(...)` pattern the original
// app.jsx used — so `deno desktop` embeds them into the packaged bundle.
const rendererJs = await Deno.readTextFile(
  new URL("../../dist/renderer.js", import.meta.url),
);
const rendererCss = await readOptional(
  new URL("../../dist/renderer.css", import.meta.url),
);

const indexHtml = renderIndexHtml(version, bridgeSource);

/** Start the local HTTP server that feeds the webview. */
export function startServer() {
  return Deno.serve(handle);
}

async function handle(req: Request): Promise<Response> {
  const { pathname } = new URL(req.url);

  if (pathname === "/renderer.js") {
    return new Response(rendererJs, {
      headers: { "content-type": "text/javascript; charset=utf-8" },
    });
  }

  if (pathname === "/renderer.css") {
    return new Response(rendererCss, {
      headers: { "content-type": "text/css; charset=utf-8" },
    });
  }

  // RPC routes are the "IPC channel" analog: the renderer's window.eva.invoke()
  // posts here, and the dispatch table routes to the matching handler.
  if (pathname.startsWith("/rpc/")) {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    const channel = pathname.slice("/rpc/".length);
    const payload = await req.json().catch(() => null);
    return dispatch(channel, payload);
  }

  // SPA fallback: any other path serves the shell so client-side routing works.
  return new Response(indexHtml, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/** Read a file, returning "" if it does not exist (e.g. no CSS emitted yet). */
async function readOptional(url: URL): Promise<string> {
  try {
    return await Deno.readTextFile(url);
  } catch {
    return "";
  }
}
