import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { join } from "path";
import axios from "axios";
import * as fs from "fs";

export const dynamic = "force-dynamic";

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const message = searchParams.get("message") ?? "";
  console.log("searchParams Message", message);

  const falApiKey = process.env["FAL_API_KEY"];

  const response = await axios.post(
    "https://fal.run/fal-ai/fast-sdxl",
    {
      prompt: message,
    },
    {
      headers: {
        Authorization: `Key ${falApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Use the image URL from the API response
  const imageUrl =
    response?.data?.images[0]?.url ||
    "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2639523a-690b-47af-16ab-ca07697fd000/original";

  console.log("THE API RES IS :", response?.data);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", // Use flex layout
          flexDirection: "column", // Align items horizontally
          alignItems: "stretch", // Stretch items to fill the container height
          width: "100%",
          height: "100vh", // Full viewport height
          backgroundColor: "white",
        }}
      >
        <img
          style={{
            height: "100%", // Make image full height
            objectFit: "cover", // Cover the area without losing aspect ratio
            width: "100%", // Image takes up 100% of the container's width
          }}
          src={imageUrl}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingLeft: 24,
            paddingRight: 24,
            lineHeight: 1.2,
            fontSize: 36,
            color: "black",
            flex: 1,
            overflow: "hidden",
            marginTop: 24,
          }}
        >
          {/* <div
            style={{
              color: "#0a588c",
              fontSize: 32,
              marginBottom: 12,
              display: "flex",
            }}
          >
            <strong>Generated Image for prompt:</strong>
          </div>
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              fontSize: 16,
            }}
          >
            {message}
          </div> */}
        </div>
      </div>
    ),
    {
      width: 1528,
      height: 800,
      fonts: [
        {
          name: "Inter",
          data: interReg,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
