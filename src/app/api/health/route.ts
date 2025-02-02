import API_CODE from "@/const/api_code";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json(API_CODE[200]);
  } catch (error) {
    return NextResponse.json(API_CODE[9000]);
  }
};
