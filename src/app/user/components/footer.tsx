"use client";
import { Gear, House, Stack, StackPlus } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 w-full bg-white p-4">
      <nav>
        <ul className="flex justify-around">
          {[
            { href: "/user", label: "トップ", icon: House },
            { href: "/user/my-set", label: "マイセット", icon: Stack },
            { href: "/user/my-set/store", label: "セットの追加", icon: StackPlus },
            { href: "/user/setting", label: "設定", icon: Gear },
          ].map((item) => (
            <li key={item.href} className="flex-1">
              <a href={item.href} className={`flex flex-col items-center text-xs ${pathname === item.href ? "text-accentBaseColor" : ""}`}>
                <item.icon size={32} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
