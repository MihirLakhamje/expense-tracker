import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LogoutBtn from "@/components/LogoutBtn";
import Link from "next/link";
import { getSession } from "@/libs/auth";

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
    <html lang="en" data-theme="light">
      <body className={`${inter.className}`}>
        <div className="navbar bg-base-100 py-2 border-b px-2 sm:px-20">
          <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost text-lg btn-sm">
              Expense Tracker
            </Link>
          </div>
          <label className="flex cursor-pointer gap-2 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="dark"
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
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
