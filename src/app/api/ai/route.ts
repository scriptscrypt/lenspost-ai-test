import { NextRequest, NextResponse } from "next/server";
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";
import { extractPathFromURL } from "@/app/utils/extractPathFromURL";

const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

// const postUrl = `${process.env["HOST"]}/api/code`;
const postUrl = `${process.env["HOST"]}/api/code`;
export async function POST(req: NextRequest) {
  const {
    untrustedData: { inputText },
    trustedData: { messageBytes },
  } = await req.json();
  const frameMessage = Message.decode(Buffer.from(messageBytes, "hex"));
  const validateResult = await hubClient.validateMessage(frameMessage);
  if (validateResult.isOk() && validateResult.value.valid) {
    const validMessage = validateResult.value.message;

    let urlBuffer = validMessage?.data?.frameActionBody?.url ?? [];
    const urlString = Buffer.from(urlBuffer).toString("utf-8");
    if (!urlString.startsWith(process.env["HOST"] ?? "")) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const message = inputText ?? "";
    const imageUrl = `${process.env["HOST"]}/api/images/ai?date=${Date.now()}&message=${message}`;

    console.log("Message in ai route is", message);
    console.log("imageUrl in ai route is", imageUrl);

    const slugForImage = extractPathFromURL(imageUrl);
    const lenspostDesignURL = `https://app.lenspost.xyz/design/${slugForImage}`;
    console.log("Lenspost URL is", lenspostDesignURL);

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>AI Frames</title>
          <meta property="og:title" content="Prompt: " />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="${lenspostDesignURL}" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:button:1" content="Remix on Lenpost" />
          <meta name="fc:frame:button:1:action" content="post_redirect" />
        </head>
        <body/>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const GET = POST;
