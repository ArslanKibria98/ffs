'use client'
import React from 'react'
import finovalogo from '@/assets/images/Finova.svg'
import Image from 'next/image'
import { Button } from '@mui/material'

const Header = () => {
  // const data = [
  //   {
  //     Configuration: 'Kyc',
  //     Type: 'Type',
  //     Date: '1/1/24',
  //     Status: '',
  //     Action: '11@gmail.com'
  //   },
  //   {
  //     Configuration: 'Kyc',
  //     Type: 'Type',
  //     Date: '1/1/24',
  //     Status: '',
  //     Action: '11@gmail.com'
  //   },
  //   {
  //     Configuration: 'Kyc',
  //     Type: 'Type',
  //     Date: '1/1/24',
  //     Status: '',
  //     Action: '11@gmail.com'
  //   },
  //   {
  //     Configuration: 'Kyc',
  //     Type: 'Type',
  //     Date: '1/1/24',
  //     Status: '',
  //     Action: '11@gmail.com'
  //   }
  // ]

  return (
    <>
      <div className="mx-auto px-2 flex bg-[#FFF0F0]">
        <div className="p-4 flex justify-between w-full">
          <div className="flex-1">
            <Image src={finovalogo} width={153} height={48} alt="" />
          </div>
          <div className="flex-2 flex items-center">
            <Button className="bg-[#E2242E] text-white">EN</Button>
            <Button className="bg-white text-black">AR</Button>
          </div>
        </div>
      </div>

     
    </>
  )
}

export default Header
