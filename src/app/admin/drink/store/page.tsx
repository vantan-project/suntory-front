"use client";
import { DrinkStore } from "@/api/DrinkStore";
import { MasterCategory, MasterCategoryResponse } from "@/api/MasterCategory";
import Title from "@/components/title";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DrinkStorePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    MasterCategoryResponse["categories"]
  >([]);
  const searchParams = useSearchParams();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setImageUrl(URL.createObjectURL(acceptedFiles[0]));
        setImageData(acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (searchParams.get("category")) {
        setSelectedCategory(searchParams.get("category") as string);
      }
      setCategories((await MasterCategory()).categories);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const categoryId = parseInt(formData.get("category") as string, 10);
    if (!name || !imageData || isNaN(categoryId)) {
      alert("全てのフィールドを正しく入力してください");
      return;
    }

    const response = await DrinkStore({
      drink: {
        name,
        imageData,
        categoryId,
      },
    });

    if (response.success) {
      alert("商品が正常に登録されました");
      router.push("/admin/drink");
    } else {
      alert(response.messages[0]);
    }
  };

  return (
    <div>
      <Title title="商品登録フォーム" />
      <form onSubmit={handleSubmit}>
        <div className="flex gap-16 p-16">
          <div className="flex-[2]">
            <div {...getRootProps()}>
              <label htmlFor="imageUpload">
                <p className="text-subtitle mb-4">商品写真</p>
              </label>
              <input {...getInputProps()} />
              <div
                className={`w-full h-auto flex items-center justify-center cursor-pointer border-2 border-dashed rounded-lg text-center ${isDragActive ? "border-accentBaseColor" : ""} ${!imageData ? "aspect-square" : ""}`}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-auto rounded-md"
                    width={100}
                    height={100}
                  />
                ) : isDragActive ? (
                  "そのままはなす"
                ) : (
                  <>
                    クリックして画像を選択するか
                    <br />
                    ここに画像をドラッグ＆ドロップしてください
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex-[3] flex flex-col justify-start gap-4">
            <div className="flex items-center border-textColor border-b p-4 gap-4">
              <label htmlFor="name" className="flex-[1] text-subtitle">
                商品名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="flex-[2] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor"
              />
            </div>
            <div className="flex items-center border-textColor border-b p-4 gap-4">
              <label htmlFor="category" className="flex-[1] text-subtitle">
                カテゴリー
              </label>
              <select
                id="category"
                name="category"
                className="flex-[2] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  選択してください
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <Link
                href="/admin"
                className="p-4 bg-gray-400 text-button text-baseColor rounded-3xl"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                className="p-4 bg-accentBaseColor text-button text-baseColor rounded-3xl"
              >
                登録する
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
