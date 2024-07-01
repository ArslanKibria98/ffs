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

import { cn } from '@/lib/utils'
import Link from 'next/link';
function page() {
  const [formDataApi, setFormDataApi] = useState()
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
  useEffect(() => {
    // Fetch forms from API
   
    const fetchForms = async () => {
      try {
        const response = await fetch('http://135.181.57.251:3048/api/Form/GetFormByVersionId?FormVersionId=aaeaf5b0-079f-48fa-c4da-08dc950b4ce7',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id':'eef836f0-1a0d-43e5-8200-b02fe4730ce4'
          },
         
        }) 
        const data = await response.json()
        console.log(data,"data")
        setFormDataApi(data?.data?.containers)
        // setForms(data)
      } catch (error) {
        console.error('Error fetching forms:', error)
      }
    }

    fetchForms()
  }, [])
  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <h3 className="font-semibold text-xl mb-4">Form Fields</h3>
      {formDataApi?.map((tab, index) => (
      <div className="bg-white rounded-xl px-6 py-8">
        <h5 className="text-sm font-semibold mb-4">{`${index+1}-${tab?.containerName?tab?.containerName:"Null"}`}</h5>

        <div className="grid grid-cols-2 gap-4 pb-4">
          {tab?.controls?.map((field, index) => (
            <>
            { field?.controlType==0&&
              <>
              <div key={index}>
              <p className="text-[12px]">
                {field?.name}
                {field.is_Required ? <span className="text-red-500"> *</span> : ''}
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
            </>
            }
                 { field?.controlType==5&&
              <>
              <div key={index}>
              <p className="text-[12px]">
                {"Phone No"}
                {field.is_Required ? <span className="text-red-500"> *</span> : ''}
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
            </>
            }
                 { field?.controlType==5&&
              <>
              <div key={index}>
              <p className="text-[12px]">
                {"OTP"}
                {field.is_Required ? <span className="text-red-500"> *</span> : ''}
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
            </>
            }
            { field?.controlType==2&&
              <>
              <div key={index}>
              <p className="text-[12px]">
                {"Slider"}
                {field.is_Required ? <span className="text-red-500"> *</span> : ''}
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
            </>
            }
            </>
       
          ))}
        
        </div>

      
      </div>
  ))}
      <div className="flex flex-row-reverse gap-4 py-4 my-4">
      <Link href="/form-builder/save">
        <Button
          onClick={() => dispatch(setAuthState(true))}
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
        >
          Next
        </Button>
        </Link>
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
