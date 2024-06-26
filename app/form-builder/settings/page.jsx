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
import { Checkbox2 } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import toast from 'react-hot-toast'
export default function page() {
  const tabNames = ['Personal Info', 'Address Details', 'Tab 3', 'Tab 4']
  const languages = ['English', 'Urdu', 'Spanish', 'Spanish','English', 'Urdu', 'Spanish', 'Spanish','English', 'Urdu', 'Spanish', 'Spanish','English', 'Urdu', 'Spanish']
  const fieldTypes = ['Numeric', 'Text', 'Email', 'Password']

  const [tabName, setTabName] = useState(tabNames[0])
  const [fieldType, setFieldType] = useState(fieldTypes[0])
  const [fieldLabel, setFieldLabel] = useState('')
  const [fieldName, setFieldName] = useState('')
  const [fieldPlaceholder, setFieldPlaceholder] = useState('')
  const [minLength, setMinLength] = useState('')
  const [maxLength, setMaxLength] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessagePosition, setErrorMessagePosition] = useState('option-one')
  const [isMandatory, setIsMandatory] = useState(false)

  const handleSubmit = () => {
    const formData = {
      formVersionId: 'aaeaf5b0-079f-48fa-c4da-08dc950b4ce7',
      containerId: '8DC43CEA-FC02-4C33-F935-08DC94FE605F',
      regionId: '9712CB25-9053-4BF4-936C-7C279CE5DA69',
      name: tabName,
      default_Value: '',
      inputType: fieldType,
      fieldLabel,
      fieldName,
      placeholder: fieldPlaceholder,
      minLength: minLength,
      maxLength: maxLength,
      errorMsgTxt: errorMessage,
      errorMsgPosition: errorMessagePosition,
      is_Required: isMandatory
    }

    fetch('http://135.181.57.251:3048/api/Controls/CreateTextbox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Request-Id': '9bab662d-18ca-4cac-a2af-7d8e03008707'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        toast.success(data.notificationMessage)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="p-6">
      <div className="border-radius bg-white p-6">
        <div className="grid grid-cols-2 gap-8 gap-y-4">
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            Form Details
          </h5>

          {/* <div className="col-span-2">
          <Select
            className="w-full"
            onValueChange={(e) => {
              setTabName(e)
            }}
            defaultValue={tabName}
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
            Required Field Indicator
            </label>
            <SelectTrigger className="w-full h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabNames.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

          {/* <h5 className='text-xl font-semibold mt-4 col-span-2'>Select Type</h5> */}

          {/* <div className="col-span-2">
          <Select
            className="w-full"
            onValueChange={(e) => {
              setFieldType(e)
            }}
            defaultValue={fieldType}
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
              Field Type
            </label>
            <SelectTrigger className="w-full h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fieldTypes.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

          {/* <h5 className='text-xl font-semibold mt-4 col-span-2'>Field Details</h5> */}

          <div>
            <label htmlFor="fieldLabel" className="text-xs font-semibold">
              Required Field Indicator
            </label>
            <Input
              name="fieldLabel"
              placeholder="Enter Field Label"
              className="p-4 h-[48px]"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldName" className="text-xs font-semibold">
              Target URL
            </label>
            <Input
              name="fieldName"
              placeholder="Enter Field Name"
              className="p-4 h-[48px]"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">
              Success Message
            </label>
            <Input
              name="fieldPlaceholder"
              placeholder="Enter Field Placeholder"
              className="p-4 h-[48px]"
              value={fieldPlaceholder}
              onChange={(e) => setFieldPlaceholder(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">
              Fail Message
            </label>
            <Input
              name="fieldPlaceholder"
              placeholder="Enter Field Placeholder"
              className="p-4 h-[48px]"
              value={fieldPlaceholder}
              onChange={(e) => setFieldPlaceholder(e.target.value)}
            />
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            Language Settings
          </h5>

          <div className="col-span-1">
            <Select
              className="w-full"
              onValueChange={(e) => {
                setTabName(e)
              }}
              defaultValue={tabName}
            >
              <label htmlFor="minLen" className="text-xs font-semibold">
                Default Language
              </label>
              <SelectTrigger className="h-[48px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tabNames.map((style, index) => (
                  <SelectItem key={index} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 col-span-2 flex items-center space-x-2">
            <Checkbox2 checked={isMandatory} onCheckedChange={setIsMandatory} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select all languages?
            </label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            Select Languages
          </h5>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            {languages.map((style, index) => (
              <div
                key={index}
                className="col-span-1 flex items-center space-x-2"
              >
                <Checkbox2 onCheckedChange={setIsMandatory} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <label htmlFor="tabName" className="text-[16px] font-semibold">
            Country Settings
            </label>
            <Input
              name="tabName"
              placeholder="Type Here"
              className="p-4 h-[48px]"
            />
          </div>
          <div className="mb-4 col-span-2 flex items-center space-x-2">
            <Checkbox2 checked={isMandatory} onCheckedChange={setIsMandatory} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select all Countries?
            </label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
          Select Countries
          </h5>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            {languages.map((style, index) => (
              <div
                key={index}
                className="col-span-1 flex items-center space-x-2"
              >
                <Checkbox2 onCheckedChange={setIsMandatory} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>

         

         
        </div>

        <div className="flex flex-row-reverse gap-4 py-1 my-4">
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
            onClick={handleSubmit}
          >
            Next
          </Button>

          <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
            Previous
          </Button>
        </div>
      </div>
    </div>
  )
}
