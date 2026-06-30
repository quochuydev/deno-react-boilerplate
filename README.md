<div align="center">

# Deno React Boilerplate

**A Foundation for Scalable Cross-Platform Desktop Apps**

Build a native desktop app with **Deno + React** — no Node, no webpack — and
package it into a real, signed app with one command.

![Deno](https://img.shields.io/badge/Deno-2.x-22c55e?logo=deno&logoColor=white)
![React](https://img.shields.io/badge/React-19-22c55e?logo=react&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-22c55e)

[**Website**](https://quochuydev.github.io/deno-react-boilerplate/) ·
[**Download**](https://github.com/quochuydev/deno-react-boilerplate/releases/latest)

</div>

---

## What you get

- A native desktop app window powered by React.
- One-command packaging into a signed `.dmg` / native app.
- Built-in auto-update so shipped apps stay current.

## Download

Grab the latest packaged app from the
[**Releases**](https://github.com/quochuydev/deno-react-boilerplate/releases/latest)
page (`EvaKiosk.dmg`, macOS), open it, and drag the app to Applications.

## Build it yourself

You'll need [Deno 2.x](https://deno.com/).

```bash
git clone https://github.com/quochuydev/deno-react-boilerplate
cd deno-react-boilerplate

deno task start        # build the UI and open the app window
deno task build:mac    # package a distributable macOS .dmg
```

## Commands

| Command               | What it does                         |
| --------------------- | ------------------------------------ |
| `deno task start`     | Build the UI and open the app window |
| `deno task build:mac` | Package a macOS `.dmg`               |
| `deno task build:all` | Package for all platforms            |

## Make it yours

- **UI** lives in `src/renderer/` — edit `routes/Home.tsx` or add new screens.
- **App name** and icon are set in `deno.json` under `desktop.app`.
- The landing page in `docs/` is published to the project website.

## License

MIT.
