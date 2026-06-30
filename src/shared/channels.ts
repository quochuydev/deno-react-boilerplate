// Channel contracts shared by the Deno side (RPC handlers) and the renderer
// (the window.eva bridge). Add a channel by extending `Channels` and
// registering a handler in src/main/ipc/router.ts — both sides stay typed.

export interface SystemInfo {
  version: string;
  platform: string;
  arch: string;
  denoVersion: string;
}

/** Map of channel name -> { request payload, response payload }. */
export interface Channels {
  "system.info": { request: null; response: SystemInfo };
}

export type ChannelName = keyof Channels;

/** The typed RPC surface injected into the webview as `window.eva`. */
export interface EvaBridge {
  version: string;
  invoke<C extends ChannelName>(
    channel: C,
    payload: Channels[C]["request"],
  ): Promise<Channels[C]["response"]>;
}

declare global {
  interface Window {
    eva: EvaBridge;
    __APP_VERSION__?: string;
  }
  var eva: EvaBridge;
}
