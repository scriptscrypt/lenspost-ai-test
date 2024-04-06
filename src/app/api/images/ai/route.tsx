import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { join } from "path";
import axios from "axios";
import * as fs from "fs";
import {
  extractPathAddDesign,
  extractPathFromURL,
} from "@/app/utils/functions/extractPathFromURL";
import fnFalAPI from "@/app/utils/functions/callFalAPI";

export const dynamic = "force-dynamic";

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const message = searchParams.get("message") ?? "";
  console.log("searchParams Message", message);

  const falAPIRes = await fnFalAPI(message);
  const imageUrl = falAPIRes.imageUrl;

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
