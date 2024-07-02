'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export default function ControlListButton({ icon, title, controlData, index, controlModalManager, setControlModalManager }) {

  return (
    <>
      <Dialog open={controlModalManager[index]} onOpenChange={()=>{setControlModalManager(index)}}>
        <DialogTrigger onClick={()=>{setControlModalManager(index)}}>
          <div className={"inline-flex items-center rounded-md text-sm w-full h-10 px-4 py-2"
              +" bg-[#ffffff] hover:bg-[#efefef] border border-[#d9d9d9] justify-start gap-2 font-light text-[12px] text-black overflow-hidden"}
          >
            <Image src={icon} alt="icon" width={16} height={16} />{' '}
            <span> {title}</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {controlData}
          </DialogHeader>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
