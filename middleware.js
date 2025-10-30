import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware is running"); // Log to check if middleware runs

  const token = req.cookies.get("authToken");
  console.log("Token:", token); // Log the token value

  if (!token) {
    console.log("No token found. Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  console.log("Token found. Proceeding to the requested route...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/*"], // Apply to dashboard and subroutes
};
