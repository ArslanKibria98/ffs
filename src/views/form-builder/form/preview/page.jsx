import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover'
// import { Calendar } from '@/components/ui/calendar'
// import { CalendarIcon } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

// import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import BoxLoader from '@/components/BoxLoader'

// import { Link } from "react-router-dom"

export default function FormPreviewPage() {
  const version_id = useSelector((state) => state?.formStore.version_id);
  // const version_id = useSelector((state) => state?.formStore.version_id);

  const [loader, setLoader] = useState(true);
  const [formDataApi, setFormDataApi] = useState([
    // {
    //   containerName: "Tab Name",
    //   controls: [
    //     { //  Text Field
    //       controlType: 0,
    //       name: "Personal Details",
    //       is_Required: true,
    //       placeholder: "Enter text here"
    //     },
    //     { //  Button
    //       controlType: 1,
    //       name: "DummyButton",
    //       is_Required: false,
    //       placeholder: "A dummy button"
    //     },
    //     { //  Slider
    //       controlType: 2,
    //       name: "Range Slider",
    //       is_Required: true,
    //       placeholder: "Select age range"
    //     },
    //     { //  File
    //       controlType: 3,
    //       name: "File Upload",
    //       is_Required: false,
    //       placeholder: "Upload File Here"
    //     },
    //     { //  Phone Number
    //       controlType: 5,
    //       name: "Phone Number",
    //       is_Required: true,
    //       placeholder: "+92 300 0000000"
    //     },
    //     { //  OTP
    //       controlType: 4,
    //       name: "DummyButton",
    //       is_Required: false,
    //       placeholder: ""
    //     },
    //   ]
    // }
  ])

  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `http://135.181.57.251:3048/api/Form/GetFormByVersionId?FormVersionId=${version_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const data = await response.json()
      console.log(data, 'data')
      setFormDataApi(data?.data?.containers)
      // setForms(data)
      setLoader(false)
    } catch (error) {
      console.error('Error fetching forms:', error)
      toast.error("Unable to get form!")
      setLoader(false)
    }
  }
  useEffect(() => {
    return () => fetchForms();
  }, [])
  const transformedData = formDataApi.map(container => ({
    test: container.containerName,
    ...container
}));

  // console.log(formDataApi[0]?.containerName?.toString())
  var defaultTabValue = formDataApi[0]?.containerName?.toString() + "";

  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <h3 className="font-semibold text-xl mb-4">Form Fields</h3>
      {/* {defaultTabValue} */}
      <Tabs defaultValue={defaultTabValue}>
         <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
          {formDataApi.map((tab, index) => (
           <TabsTrigger key={index} value={tab?.containerName} className="rounded p-0 px-3 h-8 w-fit">
             <h5 className='text-sm'>{tab?.containerName || 'Tab Name'}</h5>
             {/* <h5 className='text-sm'>{`${index + 1} - ${tab?.containerName ? tab?.containerName : 'Tab Name'}`}</h5> */}
           </TabsTrigger>
          ))}
         </TabsList>
         {formDataApi.map((tab, index) => (
          <TabsContent key={index} value={tab?.containerName} className="border bg-white p-4 rounded-xl w-full min-h-[400px]">
              {tab?.controls?.map((field, fieldIndex) => (
                <GetRelevantField key={fieldIndex} control={field} />
              ))}
          </TabsContent>
         ))}
       </Tabs>
      {!loader && formDataApi?.length < 1 ? (
        <span>No fields in form!</span>
      ) : ""}
      {loader&&<BoxLoader />}
      <div className="flex flex-row-reverse gap-4 py-4 my-4">
        <a href={`/form-builder/form/save`}>
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
          >
            Next
          </Button>
        </a>
        <a href={`/form-builder/form/settings`}>
        <Button
          className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light"
        >
          Previous
        </Button>
        </a>
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
            placeholder={field?.placePlaceholder}
          />
        </div>
      </div>
    )
  }

  if (field?.controlType == 1) {  //  Button
    return (
      <div>
        <p className="text-[12px]">
          {'Button'}
          {field.is_Required ? <span className="text-red-500"> *</span> : ''}
        </p>
        <div className="flex justify-between w-full gap-3">
          <button
          style={{color: (field.fontColor || "#fff"), backgroundColor: (field.backgroundColor || "#e2252e"), fontFamily: (field.fontFamily || "mono"),
            fontSize: (field.fontSize || "14px"), fontStyle: (field.fontStyle || "normal")}}
          >
            {field?.name}
          </button>
        </div>
      </div>
    )
  }

  if (field?.controlType == 2) {  //  Slider
    return (
      <div className='col-span-2 flex flex-col gap-y-2'>
        <p className="text-[12px]">
          {field.question}
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
            placeholder={field?.phone_Number}
          />
        </div>
      </div>
    )
  }
}
