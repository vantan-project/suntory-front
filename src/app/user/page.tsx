import Image from "next/image";

export default function User() {
  return (
    <div className="relative">
      <Image src="https://placehold.jp/800x600.png" alt="Logo" width={800} height={320} className="h-80 w-full object-cover" />
      <div className="relative top-[-32px] rounded-t-[32px] bg-baseColor w-full min-h-[calc(100vh-320px+32px)] p-5">
        <h2 className="text-subtitle">現在のマイセット</h2>
      </div>
    </div>
  );
}
