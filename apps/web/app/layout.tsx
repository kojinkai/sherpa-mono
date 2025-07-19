import type { Metadata } from "next";
import { inter } from "./fonts";
import clsx from "clsx";
import "./globals.css";

export const metadata: Metadata = {
  title: "Created By Lewis",
  description: "An app that is yet unnamed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={clsx(
        "bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 antialiased",
        inter.className,
      )}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
