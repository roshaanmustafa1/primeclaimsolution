import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function releaseId(): string {
  try {
    return readFileSync(join(process.cwd(), "RELEASE_ID"), "utf8").trim();
  } catch {
    return "unknown";
  }
}

export function GET() {
  // PHASE 4 DRILL ONLY: intentionally broken health endpoint.
  // The deploy health check must fail and auto-rollback must restore the previous release.
  // Revert immediately after the drill proves rollback.
  return NextResponse.json(
    {
      ok: false,
      release: releaseId(),
      uptime: Math.floor(process.uptime()),
    },
    { status: 500 }
  );
}
