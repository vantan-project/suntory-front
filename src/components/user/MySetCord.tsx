import { UserMySetResponse } from "@/api/UserMySet";
import Image from "next/image";

export interface MySetCordProps {
  mySet: UserMySetResponse["mySet"];
  onClick: () => void;
}

export function MySetCord({ mySet, onClick }: MySetCordProps) {
  const bgColor =
    mySet === null
      ? "bg-gray-500"
      : mySet.isLacking
      ? "bg-errorColor"
      : "bg-accentBaseColor";

  return (
    <div className={`${bgColor} rounded-xl p-4 h-64 relative`}>
      {mySet?.isLacking && (
        <div className="absolute -top-8 left-0 text-xl text-errorColor">
          ※本数が足りません
        </div>
      )}
      <div className="absolute top-0 right-4 text-xl text-baseColor bg-accentDarkColor font-bold rounded-b-xl px-6 py-1">{`${
        new Date().getMonth() + 2
      }月分`}</div>

      <div className="text-baseColor text-xl font-bold pb-2">
        {mySet ? mySet.name : "未設定"}
      </div>
      <div className="flex gap-4">
        <div className="bg-baseColor w-2/5 h-48 rounded-xl overflow-hidden relative">
          {mySet?.imageUrl && (
            <Image
              className="custom-image"
              src={mySet?.imageUrl}
              alt="my-set-image"
              width={100}
              height={100}
            />
          )}
        </div>

        <div className="border-t-4 border-baseColor w-3/5 flex flex-col items-center gap-1">
          <div className="w-full h-36 overflow-auto">
            {mySet?.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-baseColor px-1"
              >
                <div className="text-baseColor">{item.drinkName}</div>
                <div className="text-baseColor">{`×${item.bottleCount}`}</div>
              </div>
            ))}
          </div>
          <button
            className="text-accentDarkColor bg-baseColor rounded-xl text-xl font-bold px-6 py-1 flex items-center gap-2"
            onClick={onClick}
          >
            <div>切り替え</div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 16.5H19.5V21.5M10.5 8.5H5.50003V3.5M19.918 9.503C19.3574 8.11519 18.4186 6.91251 17.2084 6.03166C15.9983 5.15082 14.5653 4.62714 13.0723 4.52016C11.5793 4.41318 10.0863 4.72718 8.76291 5.42648C7.43952 6.12577 6.33886 7.18231 5.58603 8.476M5.08203 15.497C5.64283 16.8846 6.5816 18.087 7.79166 18.9676C9.00172 19.8483 10.4346 20.3718 11.9273 20.4788C13.4201 20.5858 14.9129 20.2719 16.2362 19.5728C17.5595 18.8737 18.6601 17.8174 19.413 16.524"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
