// The webview preload bridge.
//
// This source is injected inline into the webview <head> (see src/main/html.ts)
// and runs before the renderer bundle. It exposes a small, typed RPC surface as
// `window.eva` so the renderer never builds raw fetch calls itself — the shape
// mirrors the EvaBridge interface in src/shared/channels.ts.
export const bridgeSource = /* js */ `
  globalThis.eva = {
    version: globalThis.__APP_VERSION__ ?? "dev",
    async invoke(channel, payload) {
      const res = await fetch("/rpc/" + channel, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload ?? null),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.error || ("RPC " + channel + " failed: " + res.status));
      }
      return await res.json();
    },
  };
`;
