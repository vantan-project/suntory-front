import AddDrink from "@/components/icons/add-drink";
import Drink from "@/components/icons/drink";
import Title from "@/components/title";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <>
      <Title title="トップ" />
      <div className="flex justify-center gap-8 max-w-screen-lg mx-auto p-4 h-[calc(100vh-130px)]">
        <Link
          href="/admin/drink"
          className="text-textColor text-button flex-1 border-4 border-accentDarkColor bg-baseColor rounded-xl flex flex-col justify-center items-center h-min aspect-square max-w-64"
        >
          <Drink />
          ドリンク一覧
        </Link>
        <Link
          href="/admin/drink/store"
          className="text-textColor text-button flex-1 border-4 border-accentDarkColor bg-baseColor rounded-xl flex flex-col justify-center items-center h-min aspect-square max-w-64"
        >
          <AddDrink />
          ドリンク追加
        </Link>
      </div>
    </>
  );
}
