"use client";
import { AuthLogin } from "@/api/AuthLogin";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import EyeClose from "@/components/icons/eye-close";
import EyeOpen from "@/components/icons/eye-open";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AuthLogin({
      user: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });

    if (response.success) {
      // TODO: expiresを何日にするか
      Cookies.set("authToken", response.authToken, { expires: 7 });
      if (response.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } else {
      alert(response.messages[0]);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Image src="/logo.png" alt="Logo" width={588} height={176} />
      <div className="bg-baseColor p-12 rounded-md w-full md:w-1/2 md:shadow-md">
        <h2 className="text-textColor mb-6">アカウントにログイン</h2>

        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor pr-10"
            />
            <div
              className="absolute right-3 inset-y-0 flex items-center justify-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClose /> : <EyeOpen />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accentBaseColor text-baseColor py-3 rounded-md shadow-md"
          >
            ログイン
          </button>
        </form>

        <p className="mt-4">
          アカウントがない方は
          <Link
            href="/sign-up"
            className="text-accentBaseColor hover:underline"
          >
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
}
