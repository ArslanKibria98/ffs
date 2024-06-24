"use client"
import React from 'react'
import Image from 'next/image'

import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'

function FieldInfo({ field }) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center w-full'>
                <div className='pt-6 flex items-baseline'>
                    <Image src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16} />
                </div>
                <div className='w-full'>
                    <span className='text-[12px]'>{field?.name}</span>
                    <div className='flex justify-between w-full gap-3'>
                        <Input className='w-[82%]' type="text" value='Field Type' name="" id="" readOnly/>
                        <div className='flex justify-evenly gap-1 w-[18%]'>
                            <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                <span className='text-[10px]'>Mandatory</span>
                                <Switch />
                            </div>
                            <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]">
                                <span className='text-[10px]'>Edit</span>
                                <Image src="/form-layout-icons/editIcon.svg" alt="Edit Icon" height={16} width={16} />
                            </Button>
                            <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]">
                                <span className='text-[10px]'>Delete</span>
                                <Image src="/form-layout-icons/deleteIcon.svg" alt="Delete Icon" height={16} width={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldInfo