import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 bg-baseColor flex justify-between items-center h-[70px] w-full z-20">
        <h1>
          <Image src="/logo.png" alt="Logo" width={233} height={70} />
        </h1>
        <nav className="pr-8">
          <ul className="flex gap-8">
            <li>
              <Link href="/admin/drink">ドリンク一覧</Link>
            </li>
            <li>
              <Link href="/admin/drink/store">ドリンク追加</Link>
            </li>
            <li>
              <Link href="#">あああ</Link>
            </li>
            <li>
              <Link href="#">いいい</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="h-[70px]"></div>
    </>
  );
}
