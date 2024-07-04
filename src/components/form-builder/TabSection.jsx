import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { deleteApi } from '@/lib/utils'

function TabSection({ tab, index, children, resetForm }) {
    return (
        <div className=''>
            {/* Tab Name Box */}
            <div className=''>
                <div className='flex gap-1 items-center mb-2'>
                    <img src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16} />
                    <h4>Tab {index + 1}</h4>
                </div>

                {/* Tab Name Field Box */}
                <div className='flex gap-1 items-center w-full'>
                    <div className='w-[16px]'></div>
                    <div className='w-full'>
                        <span className='text-[12px]'>Tab Name</span>
                        <div className='flex justify-between w-full gap-3'>
                            <Input className='w-[90%]' type="text" value={tab?.containerName ? tab?.containerName : "--"} name="" id="" readOnly/>
                            <div className='flex justify-evenly gap-1 w-[10%]'>
                                <Button variant="ghost" className="h-[40px] flex flex-col text-[#838383] hover:text-[#ff9d00]">
                                    <span className='text-[10px]'>Edit</span>
                                    <img src="/form-layout-icons/editIcon.svg" alt="Edit Icon" height={16} width={16} />
                                </Button>
                                <Button variant="ghost" className="h-[40px] flex flex-col text-[#838383] hover:text-[#ff0200]" onClick = {()=>{deleteApi(tab?.id, resetForm)}}>
                                    <span className='text-[10px]'>Delete</span>
                                    <img src="/form-layout-icons/deleteIcon.svg" alt="Delete Icon" height={16} width={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />

            {/* Tab Fields Box */}
            <div className=' mb-10'>
                <div className='flex gap-1 items-center mb-2'>
                    <div className='w-[16px]'></div>
                    <h4>Fields</h4>
                </div>

                {/* Tab Name Field Box */}
                {children}
            </div>
            <Separator className="mb-7" />
        </div>
    )
}

export default TabSection