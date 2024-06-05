'use client'
import React from 'react'
import finovalogo from '@/assets/images/Finova.svg'
import Image from 'next/image'
import callIcon from '@/assets/images/call.svg'
const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-[100vw] grid border-t grid-cols-2 px-6 p-3">
        <div className="col-start-1 flex items-center">
          <Image src={finovalogo} width={153} height={48} alt="" />
        </div>
        <div className="col-end-3 flex justify-end items-center">
          <Image
            className="pl-2"
            src={callIcon}
            width={18}
            height={18}
            alt=""
          />
          <span className="ml-1">1234567890</span>
        </div>
      </div>
    </>
  )
}

export default Footer
