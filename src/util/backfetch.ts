import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

const BackendFetch = async (url: string, req: NextRequest) => {
  // 요청사항 데이터 가져오기
  const reqBody = await req.json();
  // 요청사항 쿠키 가져오기
  const reqCookies = req.headers.get("cookie");
  // 백엔드 요청
  const response = await fetch(`${backendUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(reqCookies ? { Cookie: reqCookies } : {}),
    },
    body: JSON.stringify(reqBody),
  });
  // 반환값에서 바디 가져오기
  const body = await response.json();
  // 바디 설정
  const nextResponse = NextResponse.json(body);
  // 반환값에서 쿠키 가져오기
  const resCookies = response.headers.get("Set-Cookie");
  // 쿠키 값이 있으면 설정
  if (resCookies) {
    nextResponse.headers.set("Set-Cookie", resCookies);
  }
  return nextResponse;
};

export default BackendFetch;
