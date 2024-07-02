'use client'
import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import Link from 'next/link'

export default function page() {
  const formId = useSelector((state) => state?.formStore.form_id);

  const [formDataApi, setFormDataApi] = useState([
    {
      containerName: "Tab Name",
      controls: [
        { //  Text Field
          controlType: 0,
          name: "Personal Details",
          is_Required: true,
          placeholder: "Enter text here"
        },
        { //  Button
          controlType: 1,
          name: "DummyButton",
          is_Required: false,
          placeholder: "A dummy button"
        },
        { //  Slider
          controlType: 2,
          name: "Range Slider",
          is_Required: true,
          placeholder: "Select age range"
        },
        { //  File
          controlType: 3,
          name: "File Upload",
          is_Required: false,
          placeholder: "Upload File Here"
        },
        { //  Phone Number
          controlType: 5,
          name: "Phone Number",
          is_Required: true,
          placeholder: "+92 300 0000000"
        },
        { //  OTP
          controlType: 4,
          name: "DummyButton",
          is_Required: false,
          placeholder: ""
        },
      ]
    }
  ])

  const fetchForms = async () => {
    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/GetFormByVersionId?FormVersionId=aaeaf5b0-079f-48fa-c4da-08dc950b4ce7',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id': 'eef836f0-1a0d-43e5-8200-b02fe4730ce4'
          }
        }
      )
      const data = await response.json()
      console.log(data, 'data')
      setFormDataApi(data?.data?.containers)
      // setForms(data)
    } catch (error) {
      console.error('Error fetching forms:', error)
      toast.error("Unable to get form!")
    }
  }
  useEffect(() => {
    return () => fetchForms();
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <h3 className="font-semibold text-xl mb-4">Form Fields</h3>
      {formDataApi?.map((tab, index) => (
        <div key={index} className="bg-white rounded-xl px-6 py-8">
          <h5 className="text-sm font-semibold mb-4">{`${index + 1}-${tab?.containerName ? tab?.containerName : 'Null'}`}</h5>

          <div className="grid grid-cols-2 gap-4 pb-4">
            {tab?.controls?.map((field, index) => (
              <GetRelevantField key={index} control={field} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-row-reverse gap-4 py-4 my-4">
        <Link href={`/form-builder/${formId}/save`}>
          <Button
            onClick={() => dispatch(setAuthState(true))}
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
          >
            Next
          </Button>
        </Link>
        <Link href={`/form-builder/${formId}/settings`}>
        <Button
          className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light"
        >
          Previous
        </Button>
        </Link>
      </div>
    </div>
  )
}

export function GetRelevantField(control) {
  let field = control?.control;

  if (field?.controlType == 0) {  //  TextBox
    return (
      <div>
        <p className="text-[12px]">
          {field?.name}
          {field.is_Required ? (
            <span className="text-red-500"> *</span>
          ) : ( '' )}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Input
            className="border-black mt-2"
            type="text"
            name="input"
            placeholder={field?.placeholder}
          />
        </div>
      </div>
    )
  }

  if (field?.controlType == 1) {  //  Button
    return (
      <div>
        <p className="text-[12px]">
          {'Slider'}
          {field.is_Required ? <span className="text-red-500"> *</span> : ''}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Button className="border-black mt-2 bg-[#e2252e] hover:bg-[#be1f27]">
            {field?.placeholder}
          </Button>
        </div>
      </div>
    )
  }

  if (field?.controlType == 2) {  //  Slider
    return (
      <div className='col-span-2'>
        <p className="text-[12px]">
          {field.name}
          {field.is_Required ? <span className="text-red-500"> *</span> : ''}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>
    )
  }

  if (field?.controlType == 3) {  //  File
    return (
      <div>
        <p className="text-[12px]">
          {field?.name}
          {field.is_Required ? <span className="text-red-500"> *</span> : ''}
        </p>
        <div className="grid gap-4 pb-4 text-transparent">
          <Input
            className="border-gray-500 text-transparent placeholder:text-transparent text-center placeholder:text-center border-dotted mt-1 py-6 h-[100px]"
            type="file"
            name="picture"
            id="picUpload"
          />
        </div>
      </div>
    )
  }

  if (field?.controlType == 4) {  //  Otp
    return (
      <div>
        <p className="text-[12px]">
          {'OTP'}
          {field.is_Required ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className="flex justify-between w-full gap-3 pt-2">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    )
  }

  if (field?.controlType == 5) {  //  PhoneNumber
    return (
      <div>
        <p className="text-[12px]">
          {'Phone No'}
          {field.is_Required ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Input
            className="border-black mt-2"
            type="text"
            name="input"
            placeholder={field?.placeholder}
          />
        </div>
      </div>
    )
  }
}
