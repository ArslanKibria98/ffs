'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function page() {
  const previewForm = {
    personal: [
      {
        label: 'First Name',
        placeholder: 'First Name',
        required: true
      },
      {
        label: 'Last Name',
        placeholder: 'Last Name',
        required: true
      },
      {
        label: 'Email',
        placeholder: 'Email',
        required: false
      },
      {
        label: 'Phone Number',
        placeholder: 'Phone Number',
        required: false
      }
    ],
    business: [
      {
        label: 'Business Name',
        placeholder: 'Business Name',
        required: true
      },
      {
        label: 'Email',
        placeholder: 'Email',
        required: false
      },
      {
        label: 'Phone Number',
        placeholder: 'Phone Number',
        required: false
      },
      {
        label: 'Address',
        placeholder: 'Address',
        required: false
      }
    ]
  }
  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <h3 className="font-semibold text-xl mb-4">Form Fields</h3>

      <div className="bg-white rounded-xl px-6 py-8">
        <h5 className="text-sm font-semibold mb-4">1- Personal Details</h5>

        <div className="grid grid-cols-2 gap-4 pb-4">
          {previewForm?.personal?.map((field, index) => (
            <div key={index}>
              <p className="text-[12px]">
                {field?.label}
                {field.required ? <span className="text-red-500"> *</span> : ''}
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
          ))}
          <div className="pt-[5px]">
            <p className="text-[12px]">Date of Birth</p>
            <Popover>
              <PopoverTrigger asChild>
                {/* <FormControl> */}
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left text-gray-500 font-normal border-black mt-[5px]'
                  )}
                >
                  <span>dd/mm/yy</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
                {/* </FormControl> */}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  // selected={field.value}
                  // onSelect={field.onChange}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date('1900-01-01')
                  // }
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <span className="text-[12px]">Address</span>
            <div className="flex justify-between w-full gap-3">
              <Input
                className="border-black mt-1"
                type="text"
                name="input"
                placeholder="Address"
              />
            </div>
          </div>
        </div>

        <h5 className="text-sm font-semibold my-4">2- Business Details</h5>

        <div className="grid grid-cols-2 gap-4 pb-4">
          {previewForm?.business?.map((field, index) => (
            <div key={index}>
              <p className="text-[12px]">
                {field?.label}
                {field.required ? <span className="text-red-500"> *</span> : ''}
              </p>
              <div className="flex justify-between w-full gap-3">
                <Input
                  className="border-black mt-1"
                  type="text"
                  name="input"
                  placeholder={field?.placeholder}
                />
              </div>
            </div>
          ))}
        </div>

        <h5 className="text-sm font-semibold my-4">3- Attach Files</h5>

        <div className="grid grid-cols-2 gap-4 pb-4">
          <Input
            className="border-gray-500 text-gray-500 placeholder:text-gray-500 text-center placeholder:text-center border-dotted mt-1 py-6 h-[70px]"
            type="file"
            name="picture"
            id="picUpload"
            // placeholder={field?.placeholder}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-4 my-4">
        <Button
          onClick={() => dispatch(setAuthState(true))}
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
        >
          Next
        </Button>
        <Button
          onClick={() => dispatch(setAuthState(false))}
          className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light"
        >
          Previous
        </Button>
      </div>
    </div>
  )
}

export default page
