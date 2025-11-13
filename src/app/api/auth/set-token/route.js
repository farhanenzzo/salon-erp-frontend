import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Set the token in an HttpOnly cookie
    cookies().set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      // You might want to set an expiry date for the cookie
      // maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error setting token:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
