import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HelplineNumbers from "./components/HelplineNumbers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmpowHer - Legal Support for Women",
  description: "Empowering women through legal knowledge and support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <HelplineNumbers />
      </body>
    </html>
  );
}
