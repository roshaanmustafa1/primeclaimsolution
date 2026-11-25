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
  return NextResponse.json({
    ok: true,
    release: releaseId(),
    uptime: Math.floor(process.uptime()),
  });
}
