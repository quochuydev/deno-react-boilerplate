<div align="center">

# 🦕⚛️ Deno React Boilerplate

**A Foundation for Scalable Cross-Platform Desktop Apps**

A desktop-app boilerplate in the spirit of
[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate),
but built on **`deno desktop`** (Laufey webview) + **React** instead of
Electron. No Node, no webpack — Deno runs TypeScript natively and esbuild
bundles the renderer.

![Deno](https://img.shields.io/badge/Deno-2.x-22c55e?logo=deno&logoColor=white)
![React](https://img.shields.io/badge/React-19-22c55e?logo=react&logoColor=white)
![esbuild](https://img.shields.io/badge/esbuild-bundler-22c55e?logo=esbuild&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-22c55e)

[**🌐 Website**](https://quochuydev.github.io/deno-react-boilerplate/) ·
[**🚀 Get Started**](#quick-start) · [**🏛️ Architecture**](#architecture)

</div>

---

## Why

|                             |                                                                             |
| --------------------------- | --------------------------------------------------------------------------- |
| ⚡ **Hot reloading**        | `deno desktop --hmr` + esbuild watch — preview changes without losing state |
| 🧩 **Native TypeScript**    | Deno runs TS with zero config; types flow across main ↔ renderer            |
| 📦 **esbuild bundling**     | React bundled locally (no CDN), tree-shaken and offline-ready               |
| 🔒 **Secure by default**    | Deno's permission model — the app gets only the access you grant            |
| 🔄 **Built-in auto-update** | `Deno.autoUpdate` stages signed bsdiff patches, wired up out of the box     |
| 🧪 **Batteries included**   | `deno fmt` / `deno lint` / `deno test` replace ESLint, Prettier, Jest       |

## Architecture

`deno desktop main.ts` opens a native window whose webview renders whatever the
embedded local HTTP server returns. The Deno side is the "main process"; the
webview is the "renderer". They talk over local HTTP-RPC routes.

| Electron concept                 | Here                                                      |
| -------------------------------- | --------------------------------------------------------- |
| Main process (Node)              | `src/main/` (Deno): server, auto-update, RPC handlers     |
| Preload / context bridge         | `src/preload/bridge.ts` → injected `window.eva`           |
| IPC (`ipcMain`/`ipcRenderer`)    | HTTP-RPC routes (`/rpc/:channel`) + `window.eva.invoke()` |
| Renderer (React in Chromium)     | `src/renderer/` (React in webview)                        |
| webpack (`.erb/configs`)         | `deno.json` tasks + `scripts/build_renderer.ts` (esbuild) |
| `package.json` / `tsconfig.json` | `deno.json`                                               |
| eslint + prettier + jest         | `deno fmt` + `deno lint` + `deno test` (built-in)         |
| `release/app` output             | `release/` (`deno desktop --output`)                      |

## Structure

```
main.ts                     Thin entrypoint → src/main/app.ts
desktop.d.ts                Ambient types for the Deno desktop runtime
deno.json                   Imports, tasks, desktop config, fmt/lint, JSX options

src/
  main/                     "Main process" (Deno)
    app.ts                  Composition root: updater + server
    server.ts               Deno.serve router: HTML, /renderer.*, /rpc/*
    html.ts                 Index HTML shell (injects version + bridge)
    updater.ts              Deno.autoUpdate wiring
    ipc/
      router.ts             channel → handler dispatch table
      handlers/system.ts    Example handler (system.info)
  preload/
    bridge.ts               Injected window.eva RPC surface (preload analog)
  renderer/                 React UI (the webview)
    index.tsx               createRoot + render
    App.tsx                 Router + nav shell
    routes/                 Home, Settings
    hooks/useInvoke.ts      Hook wrapping window.eva.invoke
    styles/global.css
  shared/
    channels.ts             RPC channel types shared by both sides

scripts/build_renderer.ts   esbuild bundle (src/renderer → dist/)
docs/                        Landing page (GitHub Pages)
tests/                       Deno.test suites
dist/                        Built renderer bundle (gitignored)
release/                     Packaged .app/.dmg (gitignored)
```

## Quick start

You'll need [Deno 2.x](https://deno.com/).

```bash
git clone https://github.com/quochuydev/deno-react-boilerplate
cd deno-react-boilerplate

deno task start   # build renderer + open the native window
# or, for a quick browser preview without the window:
deno task serve   # then open http://localhost:8000
```

## Scripts

| Task                              | What it does                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `deno task dev`                   | Watch-build the renderer + launch the window with HMR                                                            |
| `deno task start`                 | Build the renderer, then launch the desktop window                                                               |
| `deno task serve`                 | Build the renderer, then run the server-only fallback (`deno run`) for quick browser testing on `localhost:8000` |
| `deno task build:renderer`        | One-shot esbuild bundle → `dist/`                                                                                |
| `deno task build:mac`             | Package a macOS `.dmg` into `release/`                                                                           |
| `deno task build:all`             | Package for all targets                                                                                          |
| `deno task fmt` / `lint` / `test` | Format, lint, test                                                                                               |

## Adding an RPC channel

1. Add the request/response types to `Channels` in `src/shared/channels.ts`.
2. Write a handler in `src/main/ipc/handlers/` and register it in
   `src/main/ipc/router.ts`.
3. Call it from the renderer: `await window.eva.invoke("your.channel", payload)`
   (or via the `useInvoke` hook). Both sides are typed off `channels.ts`.

## Notes

- The bundle identifier and app name come from `deno.json` → `desktop.app`. The
  build regenerates `Eva Kiosk.app/Contents/Info.plist` from these, so edit
  `deno.json`, not the plist.
- `src/main/window.ts` and `menu.ts` (native window sizing, app menu) are
  intentionally absent — the experimental `deno desktop` API in `desktop.d.ts`
  doesn't expose them yet. Add them when the runtime does.

## License

MIT. Inspired by
[electron-react-boilerplate](https://electron-react-boilerplate.js.org/).
