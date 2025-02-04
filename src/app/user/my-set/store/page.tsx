"use client";

import { DrinkIndex, DrinkIndexProps, DrinkIndexResponse } from "@/api/DrinkIndex";
import { MasterCategory, MasterCategoryResponse } from "@/api/MasterCategory";
import { useEffect, useState } from "react";

export default function Page() {
  const [search, setSearch] = useState<DrinkIndexProps["search"]>({
    name: "",
    categoryId: null,
  });
  const [categories, setCategories] = useState<
    MasterCategoryResponse["categories"]
  >([]);
  const [drinks, setDrinks] = useState<DrinkIndexResponse["drinks"]>([]);

  useEffect(() => {
    const masterApi = async () => {
      const masterCategoryResponse = await MasterCategory();
      setCategories(masterCategoryResponse.categories);
    };
    masterApi();
  }, []);

  const indexApi = async () => {
    const response = await DrinkIndex({
      search: search,
    });
    setDrinks(response.drinks);
  };
  useEffect(() => {
    indexApi();
  }, [search]);

  return (
    <div>
      <div className="bg-accentLightColor pt-14 pb-[10px] px-5 flex flex-col gap-[10px]">
        <div className="relative">
          <input
            className="w-full h-[36px] rounded-lg border border-baseColor pl-4 pr-10 relative flex items-center"
            placeholder=""
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
  );
}
