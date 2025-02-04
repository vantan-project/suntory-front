"use client";

import { DrinkNew, DrinkNewResponse } from "@/api/DrinkNew";
import { UserMySet, UserMySetResponse } from "@/api/UserMySet";
import { UserPlan, UserPlanResponse } from "@/api/UserPlan";
import { MySetCord } from "@/components/user/MySetCord";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [drinkNew, setDrinkNew] = useState<DrinkNewResponse["imageUrls"]>([]);
  const [userMySet, setUserMySet] = useState<
    UserMySetResponse["mySet"] | undefined
  >();
  const [userPlan, setUserPlan] = useState<UserPlanResponse["plan"]>();

  useEffect(() => {
    const topApi = async () => {
      const drinkNewResponse = await DrinkNew();
      setDrinkNew(drinkNewResponse.imageUrls);

      const userMySetResponse = await UserMySet();
      setUserMySet(userMySetResponse.mySet);

      const userPlanResponse = await UserPlan();
      setUserPlan(userPlanResponse.plan);
    };

    topApi();
  }, []);

  return (
    <div className="relative pt-20">
      <Image
        unoptimized={true}
        className="w-full absolute top-0 left-0 -z-10"
        src="/new-merchandise-content.png"
        alt="new-merchandise-content"
        width={100}
        height={100}
      />
      <svg
        className="absolute top-14 left-8 -z-10"
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_193_4144)">
          <rect
            x="-7"
            y="10.5508"
            width="67.8111"
            height="67.8111"
            rx="33.9056"
            transform="rotate(-15 -7 10.5508)"
            fill="#247488"
          />
          <path
            d="M23.7069 44.3775L20.9598 45.1135C20.5058 44.6016 20.0577 44.1812 19.3485 43.5513L13.0505 37.9899C12.5804 37.5568 11.9454 36.9256 11.3092 36.2203C11.3918 36.459 11.3918 36.459 11.6163 37.0883C11.7222 37.414 11.9666 38.1871 12.0738 38.587L13.6019 44.2898C13.914 45.4547 14.1851 46.2579 14.4398 46.8606L11.9013 47.5407C11.8345 46.9437 11.6537 46.0604 11.3369 44.8781L8.93302 35.9066C8.69077 35.0025 8.48828 34.3859 8.19295 33.701L10.9053 32.9742C11.1782 33.3669 11.6309 33.8047 12.4597 34.533L18.6335 39.9787C19.2185 40.4928 20.0171 41.2478 20.586 41.8408C20.3347 41.1813 20.003 40.1521 19.8074 39.4219L18.242 33.5799C17.9672 32.5541 17.7414 31.8506 17.46 31.2179L19.9985 30.5377C20.0805 31.2611 20.2181 31.9137 20.5023 32.9743L22.9668 42.1718C23.2277 43.1455 23.4395 43.7969 23.7069 44.3775ZM35.4694 38.8777L36.089 41.1901C35.4398 41.2709 34.8741 41.3852 33.8135 41.6694L28.3889 43.1229C27.3457 43.4024 26.8809 43.5456 26.1948 43.7667C26.1127 43.0433 25.9938 42.4602 25.7189 41.4344L23.1985 32.0282C22.9563 31.1241 22.7817 30.6118 22.4585 29.8226C23.1632 29.671 23.6199 29.5673 24.6805 29.2831L29.9313 27.8762C30.8006 27.6432 31.3651 27.4547 32.1416 27.1535L32.7565 29.4485C32.0725 29.5386 31.5069 29.6529 30.481 29.9278L25.4737 31.2695L26.4334 34.8512L30.6583 33.7191C31.5624 33.4769 32.1443 33.2837 32.886 32.9918L33.4963 35.2694C32.7555 35.3561 32.2814 35.4645 31.2034 35.7533L26.9611 36.8901L28.0605 40.9933L33.2765 39.5957C34.2502 39.3348 34.7451 39.1649 35.4694 38.8777ZM51.158 37.022L48.8281 37.6462C48.6468 37.2476 48.2726 36.5465 47.9403 36.002L44.3469 30.0326C43.974 29.4058 43.6404 28.787 43.2464 27.9422C43.3207 28.9845 43.3285 29.7092 43.3211 30.3075L43.2112 37.2692C43.2122 38.1075 43.2221 38.7011 43.2818 39.1324L40.9694 39.752C40.766 39.3406 40.766 39.3406 40.0201 38.0869L34.5815 28.8477C34.0157 27.9185 33.6974 27.4261 33.3316 26.9651L36.1135 26.2197C36.3067 26.8015 36.5334 27.2998 36.9296 28.0136L40.3215 34.2046C40.5877 34.711 41.0165 35.5465 41.2839 36.1271C41.2211 34.9885 41.2123 34.4691 41.221 33.945L41.3526 26.7166C41.3656 25.9305 41.3336 25.3241 41.2599 24.8407L43.3985 24.2677C43.5625 24.671 43.9006 25.3071 44.2643 25.8992L48.0052 32.0713C48.248 32.4907 48.4281 32.8151 49.0557 34.0446C49.0355 33.6214 49.0355 33.6214 48.9768 32.9849C48.9544 32.6928 48.9118 31.9774 48.9046 31.8116L48.7653 24.8236C48.7621 24.1163 48.6754 23.3755 48.5623 22.884L51.3442 22.1386C51.2592 22.795 51.2285 23.3064 51.2205 24.3893L51.1081 35.0973C51.1168 35.6167 51.1138 35.953 51.1209 36.1188C51.1123 36.6429 51.1123 36.6429 51.158 37.022ZM58.1811 31.0591L56.1468 31.6041C56.0664 31.2344 56.0372 31.0558 55.9813 30.8472C55.93 30.6559 55.93 30.6559 55.5937 29.6093L53.7663 23.7631C53.5265 23.0074 53.2414 22.152 53.0414 21.6838L55.8929 20.9198C55.9665 21.4032 56.1392 22.326 56.3047 23.0829L57.6453 29.0596C57.8854 30.0947 57.8854 30.0947 57.9506 30.3381C58.0065 30.5468 58.0531 30.7206 58.1811 31.0591ZM59.4447 34.8015L56.9237 35.477L56.2854 33.0951L58.8065 32.4195L59.4447 34.8015Z"
            fill="#FDFFFF"
          />
        </g>
        <defs>
          <clipPath id="clip0_193_4144">
            <rect width="70" height="70" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative w-full overflow-hidden pb-8">
        {/* スクロールするコンテナ */}
        <div className="flex w-max animate-scroll gap-40 pl-40">
          {[...drinkNew, ...drinkNew].map((imageUrl, index) => (
            <Image
              key={index}
              className="w-auto h-40 rounded-2xl"
              src={imageUrl}
              alt="new-merchandise-content"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>

      <div className="rounded-t-3xl bg-baseColor px-5 py-8">
        <div className="text-2xl font-bold text-textColor pb-10">
          現在のマイセット
        </div>

        {userMySet !== undefined && (
          <MySetCord mySet={userMySet} onClick={() => router.push("/user/my-set")} />
        )}

        <div className="text-2xl font-bold text-textColor pt-14 pb-10">
          現在のプラン
        </div>

        {userPlan !== undefined && (
          <div className="text-textColor flex justify-between border-b border-accentBaseColor">
            {userPlan ? (
              <div>
                <span className="text-2xl font-bold">{userPlan?.quantity}</span>
                <span className="text-xl">本プラン</span>
              </div>
            ) : (
              <div className="text-xl">プランが未設定です</div>
            )}

            {userPlan && (
              <div>
                <span className="text-2xl font-bold">{userPlan.amount}</span>
                <span className="text-xl">円/月</span>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-end">
          <Link className="border-b border-textColor opacity-50" href="/user/plan">
            変更はこちらから
          </Link>
        </div>
      </div>
    </div>
  );
}
