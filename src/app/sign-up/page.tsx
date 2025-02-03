"use client";
import { AuthSignUp } from "@/api/AuthSignUp";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirm-password")) {
      alert("パスワードが一致しません");
      return;
    }
    const response = await AuthSignUp({
      user: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });

    if (response.success) {
      // TODO: expiresを何日にするか
      Cookies.set("authToken", response.authToken, { expires: 7 });
      router.push("/user");
    } else {
      alert(response.messages[0]);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Image src="/logo.png" alt="Logo" width={588} height={176} />
      <div className="bg-baseColor p-12 rounded-md w-full md:w-1/2 md:shadow-md">
        <h2 className="text-textColor mb-6">アカウントを作成</h2>

        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <input type="text" id="name" name="name" placeholder="Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor" />
          <input type="email" id="email" name="email" placeholder="Email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor" />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor pr-10" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </div>
          </div>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" name="confirm-password" placeholder="Confirm Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor pr-10" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeSlash /> : <Eye />}
            </div>
          </div>

          <button type="submit" className="w-full bg-accentBaseColor text-baseColor py-3 rounded-md shadow-md">
            作成
          </button>
        </form>

        <p className="mt-4">
          ログインは
          <Link href="/login" className="text-accentBaseColor hover:underline">
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
}
