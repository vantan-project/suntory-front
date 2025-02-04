import { DrinkSelectResponse } from "@/api/DrinkSelect";
import { MySetStoreProps } from "@/api/MySetStore";
import Image from "next/image";
import React from "react";

export interface MySetStoreModalProps {
  onClose: () => void;
  myset: MySetStoreProps["mySet"];
  setMySet: React.Dispatch<React.SetStateAction<MySetStoreProps["mySet"]>>;
  drinks: DrinkSelectResponse["drinks"];
  onClick: () => void;
}

export function MySetStoreModal({
  onClose,
  myset,
  setMySet,
  drinks,
  onClick,
}: MySetStoreModalProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-textColor opacity-50"
        onClick={onClose}
      />
      <div className="absolute bg-accentDarkColor flex flex-col gap-5 items-center p-5 rounded-lg">
        <div className="text-xl text-baseColor font-bold">
          マイセットの名前を決めてください
        </div>
        <input
          className="bg-baseColor text-textColor rounded-lg p-2 w-full"
          placeholder="例: 夏用マイセット"
          value={myset.name}
          onChange={(e) =>
            setMySet({ ...myset, name: e.target.value })
          }
        />
        <div className="h-72 w-full bg-baseColor overflow-auto rounded-lg p-2">
          {myset.items.map((item) => (
            <div
              key={item.drinkId}
              className="flex items-center justify-between gap-2 pb-1 border-b border-accentDarkColor"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-[40px] bg-textColor rounded-xl overflow-hidden">
                  <Image
                    className="h-[50px] w-auto max-w-[40px] object-contain object-center overflow-auto"
                    src={
                      drinks.find((drink) => drink.id === item.drinkId)
                        ?.imageUrl ?? ""
                    }
                    alt={`${item.drinkId}`}
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  {drinks.find((drink) => drink.id === item.drinkId)?.name ??
                    ""}
                </div>
              </div>

              <div>
                ×<span className="font-bold text-xl">{item.bottleCount}</span>
              </div>
            </div>
          ))}
        </div>
        <button
            className="w-full p-2 bg-baseColor text-accentDarkColor rounded-lg"
            onClick={onClick}
        >
          追加
        </button>
      </div>
    </div>
  );
}
