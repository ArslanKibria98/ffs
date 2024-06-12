"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ControlListButton from '@/components/ControlListButton'
import LeadingListButton from '@/components/LeadingListButton'

function Page() {
  const [region, setRegion] = useState();

  const controlList = [
    {
      icon: "/control-icons/addNewTab.svg",
      title: "Add New Tab",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addTextField.svg",
      title: "Add Text Field",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addRadioButton.svg",
      title: "Radio Button",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addDropDown.svg",
      title: "Drop Down",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addLOSControl.svg",
      title: "LOS Control",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addCalander.svg",
      title: "Calendar",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addFileUpload.svg",
      title: "File Upload",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addOtp.svg",
      title: "Add OTP",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addCheckbox.svg",
      title: "Checkbox",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addTime.svg",
      title: "Time",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addPhone.svg",
      title: "Phone Number",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addTable.svg",
      title: "Table",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addSignature.svg",
      title: "Signature",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addCaptcha.svg",
      title: "Captcha",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addButton.svg",
      title: "Button",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addRating.svg",
      title: "Rating",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addEmailAddress.svg",
      title: "Email Address",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addList.svg",
      title: "List",
      func: () => { alert("Button") }
    },
    {
      icon: "/control-icons/addSlider.svg",
      title: "Slider",
      func: () => { alert("Button") }
    },
  ]
  const LeadingList = [
    {
      icon: "/leading-icons/addLoanCalculator.svg",
      title: "Loan Calculator",
      func: () => { alert("Button") }
    },
    {
      icon: "/leading-icons/addVehicleEvaluator.svg",
      title: "Vehicle Evaluator",
      func: () => { alert("Button") }
    }
  ]

  const countryList = [
    {
      name: "Saudia Arabia",
      value: "KSA"
    },
    {
      name: "Yemen",
      value: "YME"
    },
  ]

  const selectedRegionOptions = [
    {
      name: "Yakeen Lite (Mobile Ownership Verification)",
      value: "yakeen-lite"
    },
    {
      name: "Nafath Biometric Lite",
      value: "nafath-bio-lite"
    },
    {
      name: "Nafath Biometric Full",
      value: "nafath-bio-full"
    },
    {
      name: "Unifonic OTP",
      value: "unifonic-otp"
    },
    {
      name: "Unifonic SMS",
      value: "unifonic-sms"
    },
    {
      name: "Unifonic OTP",
      value: "unifonic-otp"
    },
    {
      name: "Unifonic SMS",
      value: "unifonic-sms"
    },
  ]

  return (
    <div className="grid grid-cols-4">
      <div className='col-span-1 border border-[#d3d3d3] bg-[#fff]'>
        <h4 className='font-semibold p-7 pb-4'>Items Bar</h4>

        <Tabs defaultValue="build">
          <TabsList className='grid grid-cols-2 gap-1 py-1'>
            <TabsTrigger value="build" className="rounded-none">
              Build
            </TabsTrigger>
            <TabsTrigger value="style" className="rounded-none font-light">
              Style
            </TabsTrigger>
          </TabsList>
          <div className='bg-[#fff]'>
            <TabsContent value="build">
              <Accordion className='overflow-auto' type="single" defaultValue="item-1" collapsible>
                <AccordionItem value="item-1" className="mb-1">
                  <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    Basic Controls
                  </AccordionTrigger>
                  <AccordionContent className="p-7 py-5 bg-[#fafafa] border-b border-[#e2e2e2] overflow-auto max-h-[307px]">
                    <div className='grid grid-cols-2 gap-x-2 gap-y-2'>
                      {controlList && controlList?.map((control, index) => (
                        <ControlListButton key={index} icon={control.icon} title={control.title} func={control.func} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="mb-1">
                  <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    Regional Controls
                  </AccordionTrigger>
                  <AccordionContent className="border-b border-[#e2e2e2] max-h-[450px]">
                    <div className='p-7 pt-5 pb-2 bg-[#ffffff] space-y-3'>
                      <Select className="w-full" onValueChange={(e) => { setRegion(e) }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryList.map((country, index) => (
                            <SelectItem key={index} value={country.value}>{country.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {region && (
                        <div className='flex justify-between'>
                          <span className='text-[12px] text-[#838383]'>Total Cost</span>
                          <span className='text-[16px]'>$125.43</span>
                        </div>
                      )}
                    </div>
                    {region && (
                      <div className='p-7 py-5 flex flex-col gap-y-2 bg-[#fafafa] border-b border-[#e2e2e2] max-h-[350px] overflow-auto'>
                        {selectedRegionOptions.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 border py-3 px-4 bg-[#fff] rounded">
                            <Checkbox id={item.value} />
                            <label
                              htmlFor={item.value}
                              className="text-[12px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="mb-1">
                  <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    Lending Tools
                  </AccordionTrigger>
                  <AccordionContent className="p-7 py-5 bg-[#fafafa] border-b border-[#e2e2e2] overflow-auto max-h-[307px]">
                    <div className='flex flex-col gap-x-2 gap-y-3'>
                      {LeadingList.map((leading, index) => (
                        <LeadingListButton key={index} icon={leading.icon} title={leading.title} func={leading.func} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="style">Change your password here.</TabsContent>
          </div>
        </Tabs>
      </div>

      <div className='col-span-3 mx-4'>
        <div className='bg-[#fff] h-full overflow-auto'>
          <h4 className='font-semibold p-7 pb-4'>Layout Bar</h4>
        </div>

        <div className='flex flex-row-reverse gap-4 py-1 my-4'>
          <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg">Next</Button>
          <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light">Previous</Button>
        </div>
      </div>
    </div>
  )
}

export default Page