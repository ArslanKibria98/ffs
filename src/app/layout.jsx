"use client";
import { Inter } from "next/font/google";
import "./globals.css";
// import SignOut from "@/Components/signout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { session, ...params},
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        <div className="w-[100vw] h-[100vh] flex flex-col bg-white bgAnimOut">
          <div className="h-[95vh] w-100 bg-transparent text-black">
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}