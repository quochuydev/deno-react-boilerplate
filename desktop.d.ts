// Ambient declarations for the Deno desktop runtime APIs.
// These globals only exist when the app runs under `deno desktop`; this file
// lets `deno check` type them without errors. The feature is experimental.
declare namespace Deno {
  /** The app version, taken from the `"version"` field in deno.json. */
  const desktopVersion: string | undefined;

  interface AutoUpdateOptions {
    /** Release-server base URL. Defaults to `desktop.release.baseUrl` in deno.json. */
    url?: string;
    /** Polling interval in ms. Omit for a single check at startup. */
    interval?: number;
    /** Base64 Ed25519 public key used to verify the signed manifest. */
    publicKey?: string;
    /** Fires when a patch has been staged and will apply on next launch. */
    onUpdateReady?: (version: string) => void;
    /** Fires when the previous launch failed and the app was rolled back. */
    onRollback?: (reason: string) => void;
  }

  /** Wires up a polling auto-updater that applies bsdiff binary patches. */
  function autoUpdate(options?: AutoUpdateOptions): void;
  function autoUpdate(url: string): void;
}
