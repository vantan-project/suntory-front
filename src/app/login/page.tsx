"use client";
import { AuthLogin } from "@/api/AuthLogin";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
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
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor"
          />

          <button
            type="submit"
            className="w-full bg-accentBaseColor text-baseColor py-3 rounded-md shadow-md"
          >
            ログイン
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          アカウントがない方は
          <a href="/sign-up" className="text-blue-500 hover:underline">
            こちら
          </a>
        </p>
      </div>
    </div>
  );
}
