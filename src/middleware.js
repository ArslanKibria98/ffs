import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  // if (path === "/") {
  //   return NextResponse.next();
  // }

  // if (path.startsWith(`/api/`)) {
  //   if (!req.headers.get("referer")?.includes("http://localhost:3000") || !req.headers.get("referer")?.includes("https://form-flow-manager-seven.vercel.app")) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  //   }
  // }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (path.includes("/finova")) {
    return NextResponse.next();
  }
  // console.log(session)
  if (!session && (path.includes("/home") || path.includes("/api/tags"))) {
    if (path.includes("/api/tags"))
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && (path === "/" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
}