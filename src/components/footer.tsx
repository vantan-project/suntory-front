"use client";
import { GearSix, House, Stack, StackPlus } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 w-full bg-baseColor py-2 border-[0.5px] border-t-textColor">
      <nav>
        <ul className="flex justify-around">
          {[
            { href: "/user", label: "トップ", icon: House },
            { href: "/user/my-set", label: "マイセット", icon: Stack },
            { href: "/user/my-set/store", label: "セットの追加", icon: StackPlus },
            { href: "/user/setting", label: "設定", icon: GearSix },
          ].map((item) => (
            <li key={item.href} className="flex-1 relative">
              {pathname === item.href && <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-2/3 mx-auto rounded-t-[2px] rounded-b-[4px] h-1 bg-accentBaseColor"></div>}

              <Link href={item.href} className={`flex flex-col items-center text-support ${pathname === item.href ? "text-accentBaseColor" : ""}`}>
                <item.icon size={40} weight="light" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
