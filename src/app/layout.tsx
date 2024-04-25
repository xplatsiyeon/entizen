import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import PopupComponent from "@/components/common/modal/Popup";
import { Provider } from "jotai";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "entizen",
  description: "entizen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <Provider>
        <Suspense>
          <PopupComponent />
        </Suspense>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
