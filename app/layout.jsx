import './globals.css'
import { Inter } from 'next/font/google'

import Providers from "@/components/Providers"
import { Toaster } from 'react-hot-toast'
import Footer from "@/components/footer/footer"
import Header from '@/components/header/header'

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
          <Header />
          <div className="bg-[#f5f5f5] mt-[80px]">
            {children}
          </div>
          <Footer />
        </Providers>
      </body >
    </html >
  )
}
