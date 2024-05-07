"use client";
// import { Inter } from "next/font/google";
// import "../globals.css";
import SignOut from "@/Components/signout";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    // <html lang="en">
    //   <body className={inter.className}>
        <div className="w-[100vw] h-[100vh] flex overflow-hidden">
          <div className="w-[240px] h-100 bg-[red] text-white flex flex-col gap-8 p-6 justify-between items-center">
            <div className="text-lg font-mono font-extrabold">
              FormFlowManager
            </div>
            <ul className="list-none w-full">
              <li className="text-center my-2 bg-red-800 rounded-xl">
                <a className="rounded-lg hover:underline px-4 py-2 w-100 flex gap-2 text-lg" href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Home
                </a>
              </li>
              <li className="text-center my-2 bg-red-800 rounded-xl">
                <a className="rounded-lg hover:underline px-4 py-2 w-100 flex gap-2 text-lg" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                  Account
                </a>
              </li>
              {/* <li className="text-center my-2">
                <a className="rounded-lg hover:underline px-4 py-2 w-100" href="/formManager">Form-Manager</a>
              </li> */}
            </ul>
            <div className="w-full"><SignOut /></div>
          </div>
          <div className="h-[100vh] w-full bg-[red] p-6 ps-0">
            <div className="h-full w-full bg-white text-black rounded-3xl shadow-xl shadow-red-800 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
    //   </body>
    // </html>
  );
}
