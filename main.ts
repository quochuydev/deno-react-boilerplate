/// <reference path="./desktop.d.ts" />

// Entrypoint for the Deno desktop app.
// `deno desktop main.ts` launches a native window whose webview renders
// whatever the local server returns, while this logic runs in Deno.
//
// This file is intentionally thin: all "main process" logic lives under
// src/main/ (server, html shell, RPC handlers, auto-update). See README.md
// for the architecture and how it maps onto electron-react-boilerplate.
import { bootstrap } from "./src/main/app.ts";

bootstrap();
