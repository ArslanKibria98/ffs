'use client'
import { Inter } from 'next/font/google'
import './globals.css'
// import SignOut from "@/components/signout";
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import Footer from "@/components/footer/footer"
// import ProgressBar from '@/components/progressBar/page'
import Dashboard from '@/components/dashboard/dashboard'
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { session, ...params }
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#f5f5f5]"}>
        <AntdRegistry>
          <Toaster />
          <Dashboard />
          {/* <ProgressBar /> */}
          <div className="bg-[#f5f5f5]">
              <SessionProvider session={session}>{children}</SessionProvider>
            </div>
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  )
}
