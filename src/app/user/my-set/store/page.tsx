"use client";

import {
  DrinkSelect,
  DrinkSelectProps,
  DrinkSelectResponse,
} from "@/api/DrinkSelect";
import { MasterCategory, MasterCategoryResponse } from "@/api/MasterCategory";
import { MySetStore, MySetStoreProps } from "@/api/MySetStore";
import { UserPlan } from "@/api/UserPlan";
import { MySetStoreModal } from "@/components/user/MySetStoreModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState<DrinkSelectProps["search"]>({
    name: "",
    categoryId: null,
  });
  const [categories, setCategories] = useState<
    MasterCategoryResponse["categories"]
  >([]);
  const [drinks, setDrinks] = useState<DrinkSelectResponse["drinks"]>([]);
  const [allDrinks, setAllDrinks] = useState<DrinkSelectResponse["drinks"]>([]);
  const [myset, setMySet] = useState<MySetStoreProps["mySet"]>({
    name: "",
    items: [],
  });
  const [count, setCount] = useState({
    now: 0,
    max: 0,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const masterApi = async () => {
      const masterCategoryResponse = await MasterCategory();
      setCategories(masterCategoryResponse.categories);
    };
    masterApi();
  }, []);

  const indexApi = async () => {
    const response = await DrinkSelect({
      search: search,
    });
    setDrinks(response.drinks);
  };
  useEffect(() => {
    indexApi();
  }, [search]);

  const allDrinksApi = async () => {
    const response = await DrinkSelect({
      search: {
        name: "",
        categoryId: null,
      },
    });
    setAllDrinks(response.drinks);
  };
  useEffect(() => {
    allDrinksApi();
  }, []);

  useEffect(() => {
    const userPlanApi = async () => {
      const userPlanResponse = await UserPlan();
      setCount({
        now: 0,
        max: userPlanResponse.plan?.quantity ?? 0,
      });
    };
    userPlanApi();
  }, []);

  const onPlus = (drink: (typeof drinks)[number]) => {
    if (count.now < count.max) {
      if (myset.items.some((item) => item.drinkId === drink.id)) {
        setMySet({
          ...myset,
          items: myset.items.map((item) => {
            return item.drinkId === drink.id
              ? {
                  ...item,
                  bottleCount: item.bottleCount + 1,
                }
              : item;
          }),
        });
      } else {
        setMySet({
          ...myset,
          items: [
            ...myset.items,
            {
              drinkId: drink.id,
              bottleCount: 1,
            },
          ],
        });
      }
      setCount({ ...count, now: count.now + 1 });
    }
  };

  const onMinus = (drink: (typeof drinks)[number]) => {
    if (count.now > 0) {
      if (
        myset.items.find((item) => item.drinkId === drink.id)?.bottleCount === 1
      ) {
        setMySet({
          ...myset,
          items: myset.items.filter((item) => item.drinkId !== drink.id),
        });
      } else if (myset.items.find((item) => item.drinkId === drink.id)) {
        setMySet({
          ...myset,
          items: myset.items.map((item) => {
            return item.drinkId === drink.id
              ? {
                  ...item,
                  bottleCount: item.bottleCount - 1,
                }
              : item;
          }),
        });
      }
      setCount({ ...count, now: count.now - 1 });
    }
  };

  const storeApi = async () => {
    const response = await MySetStore({
      mySet: myset,
      quantity: count.max,
    });
    alert(response.messages[0]);
    if (response.success) router.push("/user/my-set");
  };

  return (
    <div>
      {/* ヘッダー */}
      <div className="h-32" />
      <div className="fixed w-full top-0 left-0">
        <div className="relative bg-accentLightColor pt-8 pb-[10px] px-5 flex flex-col gap-[10px] h-32">
          <div className="absolute top-full right-0 bg-accentBaseColor text-baseColor py-2 px-8 rounded-bl-[40px]">
            <span className="text-2xl">
              {String(count.now).padStart(2, "0")}
            </span>
            / {String(count.max).padStart(2, "0")}
          </div>
          <div className="relative">
            <input
              className="w-full h-[36px] rounded-lg border border-baseColor pl-4 pr-10 relative flex items-center"
              value={search.name}
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
            />
            <div className="w-[36px] h-[36px] rounded-lg bg-accentBaseColor absolute top-0 right-0 text-baseColor flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
          </div>
          <select
            className="w-full h-[36px] rounded-lg border border-baseC px-4 text-textColor flex items-center"
            value={search.categoryId ?? ""}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearch({ ...search, categoryId: null });
              } else {
                setSearch({ ...search, categoryId: Number(e.target.value) });
              }
            }}
          >
            <option value="">全て</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* ヘッダー */}

      <div className="pt-6 px-5 flex flex-col">
        <div className="flex flex-col gap-1 overflow-auto">
          {drinks.map((drink) => (
            <div
              className="pb-1 border-b border-accentDarkColor flex gap-6"
              key={drink.id}
            >
              <div className="flex items-center justify-center w-[85px] bg-textColor rounded-xl overflow-hidden">
                <Image
                  className="h-[100px] w-auto max-w-[85px] object-contain object-center overflow-auto"
                  src={drink.imageUrl}
                  alt={drink.name}
                  width={100}
                  height={100}
                />
              </div>

              <div className="pt-2 w-3/4">
                <div className="text-textColor text-xl font-bold">
                  {drink.name}
                </div>

                <div className="flex items-center justify-between">
                  <div>個数</div>

                  <div className="flex gap-4">
                    <button
                      className="bg-accentDarkColor text-baseColor rounded-lg flex items-center justify-center w-10 h-10"
                      onClick={() => onMinus(drink)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M200-440v-80h560v80H200Z" />
                      </svg>
                    </button>

                    <div className="w-10 h-10 flex items-center justify-center text-textColor font-bold border-b border-accentDarkColor">
                      {myset.items.find((item) => item.drinkId === drink.id)
                        ?.bottleCount ?? 0}
                    </div>

                    <button
                      className="bg-accentDarkColor text-baseColor rounded-lg flex items-center justify-center w-10 h-10"
                      onClick={() => onPlus(drink)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ffffff"
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フッター */}
      <div>
        <div className="h-20" />
        <div className="w-full fixed bottom-20 flex justify-center items-center px-2">
          <button
            className="w-full h-12 bg-accentDarkColor text-baseColor text-xl font-bold rounded-lg"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            確認
          </button>
        </div>
      </div>
      {/* フッター */}

      {isOpenModal && (
        <MySetStoreModal
          myset={myset}
          setMySet={setMySet}
          drinks={allDrinks}
          onClose={() => setIsOpenModal(false)}
          onClick={() => storeApi()}
        />
      )}
    </div>
  );
}
