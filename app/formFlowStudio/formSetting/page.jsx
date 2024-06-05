'use client'
import React from 'react'
import TextField from '@mui/material/TextField'
import { Input, Select, Button } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useRouter } from 'next/navigation'
const formSetting = () => {
  const router = useRouter()
  const Languages = [
    {
      label: 'English'
    },
    {
      label: 'Urdu'
    },
    {
      label: 'Spanish'
    },
    {
      label: 'Punjabi'
    },
    {
      label: 'English'
    },
    {
      label: 'Urdu'
    },
    {
      label: 'Spanish'
    },
    {
      label: 'Punjabi'
    },
    {
      label: 'English'
    },
    {
      label: 'Urdu'
    },
    {
      label: 'Spanish'
    },
    {
      label: 'Punjabi'
    },
    {
      label: 'English'
    },
    {
      label: 'Urdu'
    },
    {
      label: 'Spanish'
    },
    {
      label: 'Punjabi'
    }
  ]
  return (
    <>
     
      <div className="container bg-[#FFFFFF] mt-4 mb-6 max-auto w-full">
        <div className="col-span-12">
          <h1 className="mb-6 font-bold mt-4">Form Details</h1>
          <div className="grid grid-cols-2 gap-1">
            <div>
              Required Field Indicator
              <Select
                placeholder="Asterisk: *"
                className="p-0"
                sx={{ width: 664 }}
              >
                <option value="">dfsgdhjklj</option>
              </Select>
            </div>
            <div>
              Target URL
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                className="p-0"
                disabled
                size="sm"
                value={
                  'http://8.213.12.345/notifications/sms-in-app/without-template'
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search" />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 mb-6 grid grid-cols-2 gap-1">
          <div>
            Success Message
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              className="p-0"
              disabled
              value={'User Added!'}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search" />
              )}
            />
          </div>
          <div>
            Fail Message
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              className="p-0"
              disabled
              value={'User Added!'}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search" />
              )}
            />
          </div>
        </div>

        <h1 className="mb-6 font-bold mt-4">Language Settings</h1>
        <div className="grid grid-cols-2 gap-1">
          <div>
            Default Language
            <Select
              placeholder="Asterisk: *"
              className="p-0"
              sx={{ width: 664 }}
            >
              <option value="">English</option>
              <option value="">Urdu</option>
              <option value="">Punjabi</option>
            </Select>
            <Input type="checkbox" className="border-transparent" />
            <span className="">Select All Languages</span>
          </div>
        </div>
        <div className="font-bold mt-8 mb-6">Select Languages</div>
        <div className="grid grid-cols-4 ">
          {Languages.map((item, index) => (
            <div key={index} className="grid-span-1 ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </div>
        <h1 className="mb-6 font-bold mt-4">Default Country</h1>
        <div className="grid grid-cols-2 gap-1 border-b">
          <div>
            Required Field Indicator
            <Select
              placeholder="Asterisk: *"
              className="p-0"
              sx={{ width: 664 }}
            >
              <option value="">English</option>
              <option value="">Urdu</option>
              <option value="">Punjabi</option>
            </Select>
            <Input type="checkbox" />
            <span className="">Select All Countries?</span>
          </div>
        </div>
        <div className="font-bold  mt-8 mb-6">Select Languages</div>
        <div className="grid grid-cols-4 mb-8">
          {Languages.map((item, index) => (
            <div key={index} className="grid-span-1 ">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">{item.label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="col-span-12">
          <h1 className="mb-6 font-bold mt-4">Theme Settings</h1>
          <div className="grid grid-cols-2 gap-1">
            <div>
              Background Color
              <Select
                placeholder="Asterisk: *"
                className="p-0"
                sx={{ width: 664 }}
              >
                <option value="">white</option>
              </Select>
            </div>
            <div>
              Background Image
              <Input type="file" className="flex border" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 mt-8 mb-10">
        <div className="grid grid-cols-2"></div>
        <div className="grid grid-cols-2 gap-2"></div>
        <div className="container w-full flex justify-end gap-2 ">
          <Button className="bg-[#BEBEBE] rounded-l text-white">
            Previous
          </Button>
          <Button className="bg-[#E2242E] rounded-l text-white" onClick={() => router.push('/formFlowStudio/formFields')}>Next</Button>
        </div>
      </div>
 
    </>
  )
}

export default formSetting
