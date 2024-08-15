// import '../globals.css'
import { Outlet } from 'react-router-dom'

import Providers from '@/components/Providers'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'

export default function RootLayout() {
  return (
    <Providers>
      <Toaster />
      <Header />
      <div className="bg-[#fafafa] mt-[80px] min-h-[81vh]">
        <Outlet />
      </div>
      <Footer />
    </Providers>
  )
}
