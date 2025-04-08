import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "فلای‌تودی - خرید بلیط هواپیما، رزرو هتل و تور",
  description: "رزرو آنلاین بلیط هواپیما، هتل، تور و خدمات گردشگری",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      </head>
      <body className="min-h-screen  font-vazir">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
