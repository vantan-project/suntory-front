"use client";
import { DrinkStore } from "@/api/DrinkStore";
import { MasterCategory, MasterCategoryResponse } from "@/api/MasterCategory";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function DrinkStorePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<MasterCategoryResponse["categories"]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  useEffect(() => {
    (async () => {
      setCategories((await MasterCategory()).categories);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const imageData = formData.get("imageUpload") as File;
    const categoryId = parseInt(formData.get("category") as string, 10);

    if (!name || !imageData || isNaN(categoryId)) {
      alert("全てのフィールドを正しく入力してください");
      return;
    }

    console.log(name, imageData, categoryId);

    const response = await DrinkStore({
      drink: {
        name,
        imageData,
        categoryId,
      },
    });

    if (response.success) {
      alert("商品が正常に登録されました");
    } else {
      alert(response.messages[0]);
    }
  };

  return (
    <div>
      <h2 className="text-title bg-accentLightColor pl-16 py-6 relative before:absolute before:top-0 before:left-4 before:w-7 before:rounded-xl before:h-full before:bg-accentBaseColor">商品登録フォーム</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-16 p-16">
          <div className="flex-[2]">
            <label htmlFor="imageUpload">
              <p className="text-subtitle mb-4">商品写真</p>
              <div className="bg-gray-400 w-full flex items-center justify-center cursor-pointer aspect-square">{imageUrl && <img src={imageUrl} alt="preview" className="w-full h-full object-contain" />}</div>
            </label>
            <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
          <div className="flex-[3] flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center border-textColor border-b p-4 gap-4">
                <label htmlFor="name" className="flex-[1] text-subtitle">
                  商品名
                </label>
                <input type="text" id="name" name="name" className="flex-[2] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor" />
              </div>
              <div className="flex items-center border-textColor border-b p-4 gap-4">
                <label htmlFor="category" className="flex-[1] text-subtitle">
                  カテゴリー
                </label>
                <select id="category" name="category" className="flex-[2] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor" defaultValue={""}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                  <option value="" hidden>
                    選択してください
                  </option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Link href="/admin" className="p-4 bg-gray-400 text-button text-baseColor rounded-3xl">
                キャンセル
              </Link>
              <button type="submit" className="p-4 bg-accentBaseColor text-button text-baseColor rounded-3xl">
                登録する
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
