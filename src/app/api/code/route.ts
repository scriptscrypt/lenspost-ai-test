import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.redirect("https://app.lenspost.xyz", {status: 302});
}
