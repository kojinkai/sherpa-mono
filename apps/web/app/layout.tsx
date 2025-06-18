import type { Metadata } from "next";
import { inter } from "./fonts";
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
    <html className={`${inter.className} antialiased`} lang="en">
      <body>{children}</body>
    </html>
  );
}
