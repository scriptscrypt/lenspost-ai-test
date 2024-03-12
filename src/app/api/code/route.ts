import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.redirect("https://github.com/scriptscrypt/ai-frames", {status: 302});
}
