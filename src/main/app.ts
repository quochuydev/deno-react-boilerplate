import { initAutoUpdate } from "./updater.ts";
import { startServer } from "./server.ts";

// Composition root for the "main process" (Deno side): wire up background
// auto-updates, then start the local HTTP server that feeds the webview.
// Returns the running server so callers (or tests) can shut it down.
export function bootstrap() {
  initAutoUpdate();
  return startServer();
}
