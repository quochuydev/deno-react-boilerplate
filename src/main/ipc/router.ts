import { systemInfo } from "./handlers/system.ts";

// IPC dispatch table — the main-process counterpart to the window.eva bridge.
// Each entry maps a channel name to a handler; server.ts forwards POST /rpc/*
// requests here. Keep channel names in sync with src/shared/channels.ts.

// deno-lint-ignore no-explicit-any
type Handler = (payload: any) => unknown | Promise<unknown>;

const handlers: Record<string, Handler> = {
  "system.info": systemInfo,
};

/** Route an RPC channel to its handler and serialize the result as JSON. */
export async function dispatch(
  channel: string,
  payload: unknown,
): Promise<Response> {
  const handler = handlers[channel];
  if (!handler) {
    return Response.json({ error: `Unknown channel: ${channel}` }, {
      status: 404,
    });
  }
  try {
    const result = await handler(payload);
    return Response.json(result ?? null);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
