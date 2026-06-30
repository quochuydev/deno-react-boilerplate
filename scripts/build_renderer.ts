// Bundles the React renderer for the webview.
//
// esbuild resolves react / react-dom / react-router from node_modules (Deno
// materializes them there via `"nodeModulesDir": "auto"` in deno.json) and
// bundles them in locally — no CDN at runtime, so the kiosk works offline.
// Output: dist/renderer.js (+ dist/renderer.css if any CSS is imported).
//
//   deno run -A scripts/build_renderer.ts            # one-shot production build
//   deno run -A scripts/build_renderer.ts --watch    # rebuild on change (dev)
import * as esbuild from "esbuild";

const watch = Deno.args.includes("--watch");
const root = new URL("..", import.meta.url).pathname;

const options: esbuild.BuildOptions = {
  absWorkingDir: root,
  entryPoints: ["src/renderer/index.tsx"],
  outfile: "dist/renderer.js",
  bundle: true,
  format: "esm",
  jsx: "automatic",
  jsxImportSource: "react",
  minify: !watch,
  sourcemap: watch,
  logLevel: "info",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("esbuild: watching src/renderer …");
} else {
  await esbuild.build(options);
  await esbuild.stop();
  console.log("esbuild: built dist/renderer.js");
}
