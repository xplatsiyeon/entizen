import API_CODE from "@/const/api_code";
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

export const POST = async (req: NextRequest) => {
  try {
    const file = await req.formData();

    const res = await fetch(`${backendUrl}/restapi/upload`, {
      method: "POST",
      body: file,
    });

    // 스트림을 JSON으로 변환합니다.
    const responseData = await res.json();

    // 클라이언트에게 JSON 데이터를 그대로 반환합니다.
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(API_CODE[9000]);
  }
};
