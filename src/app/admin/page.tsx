import Title from "@/components/title";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <>
      <Title title="トップ" />
      <div className="flex justify-evenly gap-8 max-w-screen-lg mx-auto p-4 h-[calc(100vh-130px)]">
        <Link
          href="/admin/drink"
          className="text-textColor text-button flex-1 border-2 border-accentBaseColor bg-accentLightColor rounded-xl flex flex-col justify-center items-center h-min aspect-square"
        >
          商品一覧
        </Link>
        <Link
          href="/admin/drink/store"
          className="text-textColor text-button flex-1 border-2 border-accentBaseColor bg-accentLightColor rounded-xl flex flex-col justify-center items-center h-min aspect-square"
        >
          商品追加
        </Link>
        <Link
          href="/admin/drink"
          className="text-textColor text-button flex-1 border-2 border-accentBaseColor bg-accentLightColor rounded-xl flex flex-col justify-center items-center h-min aspect-square"
        >
          商品一覧あああ
        </Link>
        <Link
          href="/admin/drink/store"
          className="text-textColor text-button flex-1 border-2 border-accentBaseColor bg-accentLightColor rounded-xl flex flex-col justify-center items-center h-min aspect-square"
        >
          商品追加いいい
        </Link>
      </div>
    </>
  );
}
