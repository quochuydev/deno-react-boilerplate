import { useEffect, useState } from "react";
import type { ChannelName, Channels } from "../../shared/channels.ts";

interface InvokeState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Calls a main-process RPC channel through the injected window.eva bridge and
// tracks loading/error state. Re-runs when the channel or payload changes.
export function useInvoke<C extends ChannelName>(
  channel: C,
  payload: Channels[C]["request"],
): InvokeState<Channels[C]["response"]> {
  const [state, setState] = useState<InvokeState<Channels[C]["response"]>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    setState({ data: null, error: null, loading: true });
    globalThis.eva
      .invoke(channel, payload)
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((err) =>
        active && setState({ data: null, error: String(err), loading: false })
      );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, JSON.stringify(payload)]);

  return state;
}
