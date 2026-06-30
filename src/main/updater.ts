// Background auto-update wiring, extracted from the original entrypoint.
//
// The runtime polls `<desktop.release.baseUrl>/latest.json`, downloads the
// bsdiff patch for the current version, and stages it to apply on the next
// launch (macOS/Linux). Guarded so the app still runs under plain `deno run`,
// where the API is absent.
export function initAutoUpdate() {
  if (typeof Deno.autoUpdate !== "function") return;

  Deno.autoUpdate({
    interval: 60 * 60 * 1000, // poll hourly; omit for a one-shot check at startup
    onUpdateReady(version) {
      console.log(`Update ${version} staged; it will apply on next launch.`);
    },
    onRollback(reason) {
      console.warn(`Previous launch failed; rolled back: ${reason}`);
    },
  });
}
