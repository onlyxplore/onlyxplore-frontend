import { auth } from "@/auth";
import { NextResponse } from "next/server";
export const GET = auth((req) => {
  return NextResponse.json({ auth: req.auth });
});
