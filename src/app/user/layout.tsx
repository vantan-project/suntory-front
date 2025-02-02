import "../globals.css";
import Footer from "../../component/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer></Footer>
    </>
  );
}
