import { Metadata } from "next";

const postUrl = `${process.env["HOST"]}/api/ai`;

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${process.env["HOST"] || `https://ai-frames.vercel.app`}/api/images/start?date=${Date.now()}`;
  return {
    title: "AI FRAMES",
    description: "Type something and We will generate an Image",
    openGraph: {
      title: "AI FRAMES",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:input:text": "Type your Prompt here",
      "fc:frame:button:1": "Generate AI",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col text-center lg:p-16">
      AI Images directly on Frames
    </main>
  );
}
