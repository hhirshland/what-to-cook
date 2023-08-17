import { NextResponse } from "next/server";
const openAIKey = process.env.OPEN_AI_KEY;

export async function POST(request) {
  console.log(openAIKey);

  return NextResponse.json({
    message: {
      content: "Hello, world!",
    },
  });
}
