import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "World Tree Dice Roller",
  description: "Technical challenge for World Tree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen min-w-[375px]">{children}</body>
    </html>
  );
}
