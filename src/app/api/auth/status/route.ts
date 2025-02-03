import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const isAuthenticated = req.headers.get("x-user-authenticated") === "true";
    return NextResponse.json({ isAuthenticated });
}
