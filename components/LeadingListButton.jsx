"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

export default function LeadingListButton({icon, title, func}) {
  return (
    <Button variant="ghost" className="bg-[#fff] hover:bg-[#efefef] border border-[#d9d9d9] flex justify-between gap-2 font-light text-[12px] text-black overflow-hidden" onClick={()=>{func}}>
        <div className='flex justify-start gap-1'>
          <Image src={icon} alt="icon" width={16} height={16} /> <span> {title}</span>
        </div>
        <Image src="/leading-icons/arrowRight.svg" alt="icon" width={16} height={16} />
    </Button>
  )
}