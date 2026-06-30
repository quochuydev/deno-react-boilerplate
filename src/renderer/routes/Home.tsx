import { useInvoke } from "../hooks/useInvoke.ts";

// Home screen. Demonstrates the full round-trip: the renderer calls the
// "system.info" RPC channel via window.eva and renders the result.
export function Home() {
  const { data, loading, error } = useInvoke("system.info", null);

  return (
    <section className="card">
      <h1>Welcome to Eva Kiosk 👋</h1>
      <p>
        Deno + React desktop boilerplate — your touch-friendly self-service
        screen.
      </p>

      {loading && <p className="muted">Loading system info…</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <dl className="info">
          <dt>App version</dt>
          <dd>v{data.version}</dd>
          <dt>Platform</dt>
          <dd>{data.platform} ({data.arch})</dd>
          <dt>Deno</dt>
          <dd>{data.denoVersion}</dd>
        </dl>
      )}
    </section>
  );
}
