import type { SystemInfo } from "../../../shared/channels.ts";

/** Handler for the "system.info" channel: reports runtime metadata. */
export function systemInfo(): SystemInfo {
  return {
    version: Deno.desktopVersion ?? "dev",
    platform: Deno.build.os,
    arch: Deno.build.arch,
    denoVersion: Deno.version.deno,
  };
}
