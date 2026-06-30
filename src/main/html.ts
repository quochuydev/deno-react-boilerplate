// Builds the index HTML shell served to the webview.
//
// Unlike the original zero-build setup, there is no in-browser Babel or esm.sh
// import map here: the renderer is pre-bundled by esbuild (see
// scripts/build_renderer.ts) and loaded as a plain ES module from /renderer.js.
// `bridgeSource` is the preload analog — inline JS that exposes `window.eva`
// to the renderer before the bundle runs.
export function renderIndexHtml(version: string, bridgeSource: string): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <title>Eva Kiosk</title>
    <link rel="stylesheet" href="/renderer.css" />
    <script>window.__APP_VERSION__ = ${JSON.stringify(version)};</script>
    <script>${bridgeSource}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/renderer.js"></script>
  </body>
</html>`;
}
