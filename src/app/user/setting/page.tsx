"use client";

import RightArrow from "@/components/icons/right-arrow";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    // TODO: ユーザー情報を取得するAPIを叩く
    setName("tentative user");
    setAddress("愛知県名古屋市中村区太閤３丁目２−１４");
    setEmail("test@example.com");
  }, []);
  return (
    <div className="bg-gray-200 h-[calc(100vh-75px)]">
      <div className="pt-[60px] pb-[30px] px-5">
        <h1 className="text-title">設定</h1>
      </div>
      <div className="space-y-[30px]">
        <div className="bg-baseColor p-5">
          <p className="text-support">アカウント管理</p>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-textColor items-center">
              <label htmlFor="name">名前</label>
              <input
                className="text-support text-end flex-1 py-2"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex justify-between border-b border-textColor items-center">
              <label htmlFor="address">住所</label>
              <input
                className="text-support text-end flex-1 py-2"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-between border-b border-textColor items-center">
              <label htmlFor="email">メールアドレス</label>
              <input
                className="text-support text-end flex-1 py-2"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="bg-baseColor p-5">
          <p className="text-support">プラン管理</p>
          <div className="space-y-2">
            <Link
              href="#"
              className="flex justify-between py-2 border-b border-textColor"
            >
              プランの変更
              <RightArrow />
            </Link>
            <Link
              href="#"
              className="flex justify-between py-2 border-b border-textColor"
            >
              解約の手続き
              <RightArrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
