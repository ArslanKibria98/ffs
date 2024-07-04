import React from 'react'

import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { deleteApi } from '@/lib/utils'



function FieldInfo({ field }) {
    // console.log(field,"1234")
    
    // console.log(field,"field")
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center w-full'>
                <div className='pt-6 flex items-baseline'>
                    <img src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16} />
                </div>

                <div className='w-full'>
                    <span className='text-[12px]'>{field?.name || "Field Name"}</span>
                    <div className='flex justify-between w-full gap-3'>
                        <Input className='w-[82%]' type={"text"} value='' readOnly placeholder={field?.inputType || "Type"} />
                        <div className='flex justify-evenly gap-1 w-[18%]'>
                            <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                <span className='text-[10px]'>Mandatory</span>
                                <Switch checked={field?.is_Requireds ? true : false} />
                            </div>
                            <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]">
                                <span className='text-[10px]'>Edit</span>
                                <img src="/form-layout-icons/editIcon.svg" alt="Edit Icon" height={16} width={16} />
                            </Button>
                            <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]" onClick={()=>{deleteApi(field.controlId)}}>
                                <span className='text-[10px]'>Delete</span>
                                <img src="/form-layout-icons/deleteIcon.svg" alt="Delete Icon" height={16} width={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldInfo