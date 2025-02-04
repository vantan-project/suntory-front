"use client";
import { DrinkIndex, DrinkIndexResponse } from "@/api/DrinkIndex";
import { MasterCategory, MasterCategoryResponse } from "@/api/MasterCategory";
import Title from "@/components/title";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin() {
  const [masterCategories, setMasterCategories] = useState<
    MasterCategoryResponse["categories"]
  >([]);
  const [drinks, setDrinks] = useState<DrinkIndexResponse["drinks"]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setMasterCategories((await MasterCategory()).categories);
      await updateDrinks();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await updateDrinks();
    })();
  }, [categoryId]);

  const onSearchSubmit = () => {
    (async () => {
      await updateDrinks();
    })();
  };

  const updateDrinks = async () => {
    setDrinks(
      (
        await DrinkIndex({
          search: {
            name: searchValue,
            categoryId: categoryId,
          },
        })
      ).drinks,
    );
  };

  return (
    <div>
      <Title
        title="商品一覧"
        showSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={onSearchSubmit}
      />
      {searchValue}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="text-subtitle block border-b-2 border-textColor">
            カテゴリ一覧
          </h3>
          <div className="overflow-x-scroll">
            <fieldset className="flex w-full gap-4 py-4">
              {masterCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex p-2 bg-accentLightColor rounded-full"
                >
                  <input
                    type="radio"
                    name="category"
                    id={category.id.toString()}
                    value={category.name}
                    className="relative pr-5 appearance-none before:bg-baseColor before:w-4 before:h-4 before:rounded-full before:absolute before:left-0 before:top-1/2 before:transform before:translate-y-[-50%] checked:before:bg-accentBaseColor checked:before:border-2 checked:before:border-baseColor"
                    onChange={() => setCategoryId(category.id)}
                  />
                  <label
                    htmlFor={category.id.toString()}
                    className="text-nowrap"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <div className="space-y-4">
          {masterCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <h3 className="text-subtitle block bg-accentLightColor px-4 py-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {drinks
                  .find((entry) => entry.categoryId == category.id)
                  ?.items.map((drink) => (
                    <Link
                      key={drink.id}
                      href={`/admin/drink/${drink.id}`}
                      className="flex p-4 border-2 gap-2 items-center h-52"
                    >
                      <div className="h-full w-24 flex justify-center items-center">
                        <Image
                          src={drink.imageUrl}
                          alt={drink.name}
                          className="h-full w-auto object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="text-center text-button flex-1">
                        {drink.name}
                      </p>
                    </Link>
                  ))}
                <Link
                  href={`/admin/drink/stpre?category=${category.id}`}
                  className="flex p-4 border-2 gap-2 items-center h-52 justify-center"
                >
                  <div className="bg-gray-400 w-32 h-32 rounded-full flex justify-center items-center">
                    <div className="relative w-20 h-2 bg-baseColor after:absolute after:w-full after:h-full after:rotate-90 after:bg-baseColor"></div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
