import { equal } from "node:assert/strict";
import { systemInfo } from "../../src/main/ipc/handlers/system.ts";
import { dispatch } from "../../src/main/ipc/router.ts";

Deno.test("system.info handler reports runtime metadata", () => {
  const info = systemInfo();
  equal(info.platform, Deno.build.os);
  equal(info.arch, Deno.build.arch);
  equal(info.denoVersion, Deno.version.deno);
});

Deno.test("dispatch routes a known channel", async () => {
  const res = await dispatch("system.info", null);
  equal(res.status, 200);
  const body = await res.json();
  equal(body.platform, Deno.build.os);
});

Deno.test("dispatch 404s an unknown channel", async () => {
  const res = await dispatch("does.not.exist", null);
  equal(res.status, 404);
  const body = await res.json();
  equal(typeof body.error, "string");
});
