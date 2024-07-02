"use client"
import React from 'react'
import Image from 'next/image'

import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'

function FieldInfo({ field }) {
    // console.log(field,"field")
    return (
        <div className='flex flex-col gap-2'>
            {field.controlType==0&&
            <div className='flex gap-1 items-center w-full'>
                <div className='pt-6 flex items-baseline'>
                    <Image src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16} />
                </div>
             
                <div className='w-full'>
                    <span className='text-[12px]'>{field?.name}</span>
                    <div className='flex justify-between w-full gap-3'>
                        <Input className='w-[82%]' type={field.inputType} value='' name="" id="" readOnly placeholder={field?.placePlaceholder} />
                        <div className='flex justify-evenly gap-1 w-[18%]'>
                            <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                <span className='text-[10px]'>Mandatory</span>
                                <Switch checked={field?.is_Requireds?true:false} />
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
} 
{field.controlType==5&&
            <div className='flex gap-1 items-center w-full'>
                <div className='pt-6 flex items-baseline'>
                    <Image src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16} />
                </div>
             
                <div className='w-full'>
                    <span className='text-[12px]'>Phone No.</span>
                    <div className='flex justify-between w-full gap-3'>
                        <Input className='w-[82%]' type={"number"} value='' name="" id="" readOnly placeholder={"Enter Phone Number"} />
                        <div className='flex justify-evenly gap-1 w-[18%]'>
                            <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                <span className='text-[10px]'>Mandatory</span>
                                <Switch checked={field?.is_Requireds?true:false} />
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
} 
{field.controlType === 4 &&
                <div className='flex gap-1 items-center w-full'>
                    <div className='pt-6 flex items-baseline'>
                        <Image src='/form-layout-icons/draggableIcon.svg' alt='Drag Icon' height={16} width={16} />
                    </div>
                    <div className='w-full'>
                        <span className='text-[12px]'>OTP</span>
                        <div className='flex justify-between w-full gap-3'>
                            <Input className='w-[82%]' type='text' value='' name='' id='' readOnly placeholder='Enter OTP' />
                            <div className='flex justify-evenly gap-1 w-[18%]'>
                                <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Mandatory</span>
                                    <Switch checked={field?.is_Requireds?true:false} />
                                </div>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]'>
                                    <span className='text-[10px]'>Edit</span>
                                    <Image src='/form-layout-icons/editIcon.svg' alt='Edit Icon' height={16} width={16} />
                                </Button>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Delete</span>
                                    <Image src='/form-layout-icons/deleteIcon.svg' alt='Delete Icon' height={16} width={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            } 
            {field.controlType === 3 &&
                <div className='flex gap-1 items-center w-full'>
                    <div className='pt-6 flex items-baseline'>
                        <Image src='/form-layout-icons/draggableIcon.svg' alt='Drag Icon' height={16} width={16} />
                    </div>
                    <div className='w-full'>
                        <span className='text-[12px]'>File</span>
                        <div className='flex justify-between w-full gap-3'>
                            <Input className='w-[82%]' type='text' value='' name='' id='' readOnly placeholder='File' />
                            <div className='flex justify-evenly gap-1 w-[18%]'>
                                <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Mandatory</span>
                                    <Switch checked={field?.is_Requireds?true:false} />
                                </div>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]'>
                                    <span className='text-[10px]'>Edit</span>
                                    <Image src='/form-layout-icons/editIcon.svg' alt='Edit Icon' height={16} width={16} />
                                </Button>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Delete</span>
                                    <Image src='/form-layout-icons/deleteIcon.svg' alt='Delete Icon' height={16} width={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            } 
            {field.controlType === 2 &&
                <div className='flex gap-1 items-center w-full'>
                    <div className='pt-6 flex items-baseline'>
                        <Image src='/form-layout-icons/draggableIcon.svg' alt='Drag Icon' height={16} width={16} />
                    </div>
                    <div className='w-full'>
                        <span className='text-[12px]'>Slider</span>
                        <div className='flex justify-between w-full gap-3'>
                            <Input className='w-[82%]' type='text' value='' name='' id='' readOnly placeholder='Slider' />
                            <div className='flex justify-evenly gap-1 w-[18%]'>
                                <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Mandatory</span>
                                    <Switch checked={field?.is_Requireds?true:false} />
                                </div>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]'>
                                    <span className='text-[10px]'>Edit</span>
                                    <Image src='/form-layout-icons/editIcon.svg' alt='Edit Icon' height={16} width={16} />
                                </Button>
                                <Button variant='ghost' className='h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                    <span className='text-[10px]'>Delete</span>
                                    <Image src='/form-layout-icons/deleteIcon.svg' alt='Delete Icon' height={16} width={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            } 
        </div>
    )
}

export default FieldInfo