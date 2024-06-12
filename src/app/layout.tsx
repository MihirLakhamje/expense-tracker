import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LogoutBtn from "@/components/LogoutBtn";
import Link from "next/link";
import { getSession } from "@/libs/auth";
import ToggleTheme from "@/components/ToggleTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Lookout your spendings",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="navbar bg-base-100 py-2 border-b px-2 sm:px-20">
          <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost text-lg btn-sm">
              Expense Tracker
            </Link>
          </div>
          <ToggleTheme/>
          {session && (
            <div className="flex-none">
              <LogoutBtn />
            </div>
          )}
        </div>
        <main className="py-4  px-2 sm:px-20 sm:py-5">{children}</main>
      </body>
    </html>
  );
}
