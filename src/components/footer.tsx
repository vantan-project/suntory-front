"use client";
import { GearSix, Stack, StackPlus } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import House from "./icons/House";
import MySet from "./icons/MySet";
import AddMySet from "./icons/AddMySet";
import Gear from "./icons/Gear";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      <div className="h-[86px]"></div>
      <footer className="fixed bottom-0 w-full bg-baseColor border-[0.5px] border-t-textColor h-[86px] flex items-center">
        <nav className="w-full">
          <ul className="flex justify-around items-center w-full">
            {[
              { href: "/user", label: "トップ", icon: House },
              { href: "/user/my-set", label: "マイセット", icon: MySet },
              {
                href: "/user/my-set/store",
                label: "セットの追加",
                icon: AddMySet,
              },
              { href: "/user/setting", label: "設定", icon: Gear },
            ].map((item) => (
              <li key={item.href} className="flex-1 relative">
                {pathname === item.href && (
                  <div className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 w-2/3 mx-auto rounded-t-[2px] rounded-b-[4px] h-1 bg-accentBaseColor"></div>
                )}

                <Link
                  href={item.href}
                  className={`flex flex-col items-center text-support ${pathname === item.href ? "text-accentBaseColor" : ""}`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
}
