"use client";

import { MySetIndex, MySetIndexResponse } from "@/api/MySetIndex";
import { SettingMySet } from "@/api/SettingMySet";
import { UserMySet, UserMySetResponse } from "@/api/UserMySet";
import { MySetCord } from "@/components/user/MySetCord";
import { useEffect, useState } from "react";

export default function Page() {
  const [selectMySet, setSelectMySet] = useState<
    UserMySetResponse["mySet"] | null
  >(null);
  const [allMySets, setAllMySets] = useState<MySetIndexResponse["mySets"]>([]);

  useEffect(() => {
    const mySetApi = async () => {
      const mySetResponse = await UserMySet();
      setSelectMySet(mySetResponse.mySet);
    };
    mySetApi();
  }, []);

  useEffect(() => {
    const mySetIndexApi = async () => {
      const mySetIndexResponse = await MySetIndex();
      setAllMySets(mySetIndexResponse.mySets);
    };
    mySetIndexApi();
  }, []);

  const settingApi = async (id: number) => {
    await SettingMySet({
      mySetId: id,
    });
  };

  return (
    <div>
      <div className="bg-accentDarkColor pt-8 pb-5 px-5 rounded-b-3xl flex flex-col gap-6">
        <div className="text-baseColor text-xl font-bold">現在のマイセット</div>
        {selectMySet && (
          <MySetCord mySet={selectMySet} onClick={() => {}} canClick={false} />
        )}
      </div>

      <div className="px-5 pb-5">
        <div className="text-textColor text-xl font-bold pt-4 pb-6">
          マイセット一覧
        </div>
        <div className="overflow-x-auto w-full snap-x snap-mandatory">
          <div className="flex gap-4 w-max">
            {allMySets.map((mySet) => (
              <div className="snap-start" key={mySet.id}>
                <MySetCord
                  mySet={{
                    name: mySet.name,
                    isLacking: mySet.isLacking,
                    imageUrl: mySet.imageUrl,
                    items: mySet.items.map((item) => ({
                      drinkName: item.drinkName,
                      bottleCount: item.bottleCount,
                    })),
                  }}
                  onClick={() => {
                    setSelectMySet(mySet);
                    settingApi(mySet.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end pr-4 pb-4 gap-2">
        <button className="py-2 px-4 border border-accentDarkColor text-accentDarkColor text-xl font-bold rounded-xl flex gap-2 items-center">
          <div>編集</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
        </button>
        <button className="py-2 px-4 border border-errorColor text-errorColor text-xl font-bold rounded-xl flex gap-2 items-center">
          <div>削除</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
