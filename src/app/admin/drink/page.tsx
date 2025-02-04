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
    <div className="space-y-8">
      <Title
        title="商品一覧"
        showSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="p-4 space-y-8">
        <div className="space-y-4">
          <h3 className="text-subtitle block border-b-2 border-textColor">
            カテゴリ一覧
          </h3>
          <div className="overflow-x-scroll">
            <fieldset className="flex w-full gap-4 py-4">
              {masterCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-accentLightColor rounded-full relative"
                >
                  <input
                    type="radio"
                    name="category"
                    id={category.id.toString()}
                    value={category.name}
                    className="hidden peer"
                    onChange={() => setCategoryId(category.id)}
                  />
                  <label
                    htmlFor={category.id.toString()}
                    className="text-nowrap p-2 flex items-center gap-1 before:w-4 before:h-4 before:bg-baseColor before:rounded-full before:block peer-checked:before:bg-accentBaseColor peer-checked:before:border-2 peer-checked:before:border-baseColor"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <div className="space-y-8">
          {masterCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-subtitle block bg-accentLightColor px-8 py-4">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {drinks
                  .find((entry) => entry.categoryId == category.id)
                  ?.items.map((drink) => (
                    <Link
                      key={drink.id}
                      href={`/admin/drink/${drink.id}`}
                      className="flex p-4 border-2 gap-2 items-center h-52 rounded-md"
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
                  href={`/admin/drink/store?category=${category.id}`}
                  className="flex p-4 border-2 gap-2 items-center h-52 justify-center rounded-md"
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
