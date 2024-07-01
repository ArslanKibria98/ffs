'use client'
import React, { useState } from 'react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Checkbox2 } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import toast from 'react-hot-toast'

export default function AddOtp({ getter, setter }) {
  const fontColours = ['4-digits', '5-digits', '6-digits']
  const otpFormatMapping = {
    '4-digits': 4,
    '5-digits': 5,
    '6-digits': 6
  }

  const [question, setQuestion] = useState('')
  const [isRequired, setIsRequired] = useState(false)
  const [otpFormat, setOtpFormat] = useState('4-digits')

  const handleSubmit = async () => {
    const postData = {
      formVersionId: "aaeaf5b0-079f-48fa-c4da-08dc950b4ce7",
      containerId: "5b092436-804a-4c99-6b82-08dc99b4c99f",
      regionId: "9712CB25-9053-4BF4-936C-7C279CE5DA69",
      controlType: 0,
  
      question: question,
      is_Required: isRequired,
      otp_Format: otpFormatMapping[otpFormat]
    }

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/CreateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': 'aeb6cea3-3d50-4e58-8c87-e2cb535fefc9'
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        let responseData=await response.json()
        setter(!getter);
        toast.success(responseData?.notificationMessage)
        console.log('OTP added successfully')
      } else {
        console.error('Failed to add OTP')
        toast.error("Unable to save!")
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Something went wrong!")
    }
  }

  return (
    <div>
      <DialogTitle>Add OTP</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
        <div className="col-span-2">
          <label htmlFor="tabName" className="text-[16px] font-semibold">
          Question
          </label>
          <Input
            name="tabName"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className='my-4 col-span-2 flex items-center space-x-2'>
        <Checkbox2
          checked={isRequired}
          onCheckedChange={(e) => setIsRequired(e.target.checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required?
        </label>
        </div>
        
        <label className='text-[16px] font-semibold col-span-2'>OTP Format</label>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
          Choose Format
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setOtpFormat(e)}
            defaultValue={otpFormat}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontColours.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
     
      </div>
     
      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <DialogClose>
          <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  )
}
