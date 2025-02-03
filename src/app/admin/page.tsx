import Title from "@/components/title";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <>
      <Title title="トップ" />
      <Link href="/admin/drink" className="text-accentBaseColor">
        商品一覧
      </Link>
      <Link href="/admin/drink/store" className="text-accentBaseColor">
        商品追加
      </Link>
    </>
  );
}
