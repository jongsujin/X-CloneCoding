import { auth } from "./auth";
import { NextResponse } from "next/server";
// 이렇게하면 아래 matcher에만 middleware가 실행된다.
export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login");
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
