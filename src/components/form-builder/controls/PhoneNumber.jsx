import React, { useState, useEffect } from 'react'

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

import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from "../../../redux/store/loading";

export default function PhoneNumber({ getter, setter, formDataApi, resetForm }) {
  const fontFamilies = ['any']
  const dispatch = useDispatch();
  const formId = useSelector((state) => state?.formStore.form_id);
  const [question, setQuestion] = useState('')
  const [isRequired, setIsRequired] = useState(false)
  const [phoneType, setPhoneType] = useState('Normal')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [id, setId] = useState('');
  const handleSave = async () => {
    const requestBody = {
      formVersionId: formId,
      containerId: id,
      regionId: "9712CB25-9053-4BF4-936C-7C279CE5DA69",
      controlType: 0,
      question: question,
      is_Required: isRequired,
      phone_Type: phoneType,
      phone_Number: phoneNumber
    }

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/CreatePhoneNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': '9887f58e-9353-4086-b566-29c1745a84ce'
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(data.notificationMessage)
        setter(!getter);
        resetForm();
      } else {
        // setter(!getter);
        console.error('Error:', response.statusText)
        toast.error("Unable to Save!")
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      // setter(!getter);
      console.error('Error:', error)
      toast.error("Something went wrong!")
      // Handle network error
    }
  }
  
  return (
    <div>
      <DialogTitle>Add Phone Number</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
      <div className="col-span-2">
          <Select
            className="w-full"
            onValueChange={(e) => {
              setId(e)
            }}
            
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
              Tab Name
            </label>
            <SelectTrigger className="w-full h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formDataApi?.map((style, index) => (
                <SelectItem key={index} value={style?.id}>
                  {style?.containerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
          onChange={(e) => setIsRequired(e.checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required?
        </label>
        </div>
        
        <label className='text-[16px] font-semibold col-span-2'>Phone Type</label>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
          Choose Format
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setPhoneType(e)}
            defaultValue={phoneType}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
          Phone Number
          </label>
          <Input
            name="phoneNumber"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
     
      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSave}
        >
          Save
        </Button>
        
        <DialogClose className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          {/* <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
          > */}
            Cancel
          {/* </Button> */}
        </DialogClose>
      </div>
    </div>
  )
}
