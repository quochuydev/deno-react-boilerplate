<div align="center">

# Deno React Boilerplate

**A Foundation for Scalable Cross-Platform Desktop Apps**

Build a native desktop app with **Deno + React** — fast to start, hot-reloading
while you work, and packaged into a real app with one command.

![Deno](https://img.shields.io/badge/Deno-2.x-22c55e?logo=deno&logoColor=white)
![React](https://img.shields.io/badge/React-19-22c55e?logo=react&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-22c55e)

[**Website**](https://quochuydev.github.io/deno-react-boilerplate/) ·
[**Get Started**](#get-started)

</div>

---

## What you get

- A desktop app window powered by React — no Node, no webpack to configure.
- Live reload: edit the UI and see it update instantly.
- One-command packaging into a `.dmg` / native app.
- Built-in auto-update so shipped apps stay current.

## Get started

You'll need [Deno 2.x](https://deno.com/).

```bash
git clone https://github.com/quochuydev/deno-react-boilerplate
cd deno-react-boilerplate

deno task start
```

That builds the UI and opens the app window. Want a quick browser preview
instead? Run `deno task serve` and open <http://localhost:8000>.

## Everyday commands

| Command               | What it does                             |
| --------------------- | ---------------------------------------- |
| `deno task dev`       | Develop with hot reload                  |
| `deno task start`     | Build the UI and open the app window     |
| `deno task serve`     | Preview in a browser at `localhost:8000` |
| `deno task build:mac` | Package a macOS `.dmg`                   |
| `deno task build:all` | Package for all platforms                |

## Make it yours

- **UI** lives in `src/renderer/` — edit `routes/Home.tsx` or add new screens.
- **App name** and icon are set in `deno.json` under `desktop.app`.
- The landing page in `docs/` is published to the project website.

## License

MIT.
