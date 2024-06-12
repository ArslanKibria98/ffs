import './globals.css'
import { Inter } from 'next/font/google'

import Providers from "@/components/Providers"
import { Toaster } from 'react-hot-toast'
import Footer from "@/components/footer/footer"
import Dashboard from '@/components/dashboard/dashboard'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { session, ...params }
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#f5f5f5]"}>
        <Providers session={session}>
          <Toaster />
          <Dashboard />
          <div className="bg-[#f5f5f5]">
            {children}
          </div>
          <Footer />
        </Providers>
      </body >
    </html >
  )
}
