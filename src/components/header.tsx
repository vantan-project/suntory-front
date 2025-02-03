import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 bg-baseColor flex justify-between items-center h-[100px]">
        <h1>
          <Image src="/logo.png" alt="Logo" width={233} height={70} />
        </h1>
      </header>
      <div className="h-[100px]"></div>
    </>
  );
}
