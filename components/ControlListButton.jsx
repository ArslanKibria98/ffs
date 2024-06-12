"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

export default function ControlListButton({icon, title, func}) {
  return (
    <Button variant="ghost" className="bg-[#fff] hover:bg-[#efefef] border border-[#d9d9d9] justify-start gap-2 font-light text-[12px] text-black overflow-hidden" onClick={()=>{func}}>
        <Image src={icon} alt="icon" width={16} height={16} /> <span> {title}</span>
    </Button>
  )
}