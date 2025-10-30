"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  console.log("user in the auth", user);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else {
      router.replace("/dashboard");
    }
  }, [user]);

  return null; // Prevents any rendering during redirect
}
