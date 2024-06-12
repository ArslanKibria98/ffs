"use client"
import React, { useState } from 'react'
import Image from 'next/image'

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
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

import ControlListButton from '@/components/ControlListButton'
import LeadingListButton from '@/components/LeadingListButton'

import { isCloseToWhite } from '@/lib/utils'

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

  const styleColours1 = [
    "bg-[#1978DB]",
    "bg-[#01ADFB]",
    "bg-[#00C1D9]",
    "bg-[#009A8C]",
    "bg-[#39923C]",
    "bg-[#F11F65]",
    "bg-[#637E8D]",
    "bg-[#FF9C00]",
    "bg-[#EB4B18]",
    "bg-[#D83030]",
    "bg-[#4155B9]",
    "bg-[#242424]",
    "bg-[#FFFFFF]",
  ]

  const densities = [
    {
      name: "Default",
      image: "/styling-icons/densityDefault.png"
    },
    {
      name: "Smaller",
      image: "/styling-icons/densityDefault.png"
    },
    {
      name: "Bigger",
      image: "/styling-icons/densityDefault.png"
    },
    {
      name: "Classic",
      image: "/styling-icons/densityDefault.png"
    },
  ];

  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
  const fontStyles = ["Super-Light", "Light", "Medium", "Semi-Bold", "Bold", "Extra-Bold"]

  let formData = {
    formName: "KYC Form",
    tabs: [
      {
        id: 13278738,
        name: "Personal Information",
        fields: [
          {
            name: "Full Name",
            mandatory: false
          },
          {
            name: "Phone Number",
            mandatory: true
          }
        ]
      },
      {
        id: 13278737,
        name: "Address Information",
        fields: [
          {
            name: "Field 2",
            mandatory: true
          }
        ]
      }
    ]
  }

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
            <TabsContent value="style" className="px-6 py-2">
              <div>
                <h3>Background Colour </h3>

                <div className='grid grid-cols-7 gap-4 mt-3 mb-5'>
                    {styleColours1?.map((colour, index) => (
                      <div key={index} className={colour + (isCloseToWhite(colour) ? " border border-black" : "") + ' h-8 w-8 rounded-full shadow-inner'}></div>
                    ))}
                    <div className={'h-8 w-8 rounded-full flex items-center justify-center'}>
                      <Image src="/styling-icons/colourPicker.svg" alt="icon" width={24} height={24} />
                    </div>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <h3>Heading Colour </h3>

                <div className='grid grid-cols-7 gap-4 my-3 mb-5'>
                    {styleColours1?.map((colour, index) => (
                      <div key={index} className={colour + (isCloseToWhite(colour) ? " border border-black" : "") + ' h-8 w-8 rounded-full shadow-inner'}></div>
                    ))}
                    <div className={'h-8 w-8 rounded-full flex items-center justify-center'}>
                      <Image src="/styling-icons/colourPicker.svg" alt="icon" width={24} height={24} />
                    </div>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <h3>Field Colour </h3>

                <div className='grid grid-cols-7 gap-4 my-3 mb-5'>
                    {styleColours1?.map((colour, index) => (
                      <div key={index} className={colour + (isCloseToWhite(colour) ? " border border-black" : "") + ' h-8 w-8 rounded-full shadow-inner'}></div>
                    ))}
                    <div className={'h-8 w-8 rounded-full flex items-center justify-center'}>
                      <Image src="/styling-icons/colourPicker.svg" alt="icon" width={24} height={24} />
                    </div>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <h3>Density </h3>

                <div className='grid grid-cols-4 gap-2 my-3 mb-5'>
                    {densities?.map((density, index) => (
                      <div key={index} className='flex flex-col items-center'>
                        <Image src={density.image} alt="Density img" width={70} height={80} />
                        <p className='text-[#8e8fa3] text-[10px]'>{density.name}</p>
                      </div>
                    ))}
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <h3>Heading Font </h3>

                <div className='space-y-3 my-3 mb-5'>
                  <div>
                    <Select className="w-full" onValueChange={(e) => { alert(e) }} defaultValue={16}>
                      <span className='text-sm'>Font Size</span>
                      <SelectTrigger className="w-full">
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map((size, index) => (
                          <SelectItem key={index} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select className="w-full" onValueChange={(e) => { alert(e) }} defaultValue="Bold" >
                      <span className='text-sm'>Font Style</span>
                      <SelectTrigger className="w-full">
                      <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        {fontStyles.map((style, index) => (
                          <SelectItem key={index} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <h3>Field Font </h3>

                <div className='space-y-3 my-3 mb-5'>
                  <div>
                    <Select className="w-full" onValueChange={(e) => { alert(e) }} defaultValue={16}>
                      <span className='text-sm'>Font Size</span>
                      <SelectTrigger className="w-full">
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map((size, index) => (
                          <SelectItem key={index} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select className="w-full" onValueChange={(e) => { alert(e) }} defaultValue="Bold" >
                      <span className='text-sm'>Font Style</span>
                      <SelectTrigger className="w-full">
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        {fontStyles.map((style, index) => (
                          <SelectItem key={index} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className='col-span-3 mx-4'>
        <div className='bg-[#fff] h-full overflow-auto pb-4'>
          <h3 className='font-semibold p-7 pb-0'>Layout Bar &nbsp;&nbsp;&nbsp;&nbsp; {formData.formName}</h3>

          <div className='p-7 pt-4 flex flex-col'>
            {/* Tab Section Box */}
            {formData?.tabs?.map((tab, index) => (
              <div className='' key={index}>
                {/* Tab Name Box */}
                <div className=''>
                  <div className='flex gap-1 items-center mb-2'>
                    <Image src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16}/>
                    <h4>Tab {index+1}</h4>
                  </div>

                  {/* Tab Name Field Box */}
                  <div className='flex gap-1 items-center w-full'>
                    <div className='w-[16px]'></div>
                    <div className='w-full'>
                      <span className='text-[12px]'>Tab Name</span>
                      <div className='flex justify-between w-full gap-3'>
                        <Input className='w-[90%]' type="text" value={tab?.name} name="" id="" />
                        <div className='flex justify-evenly gap-1 w-[10%]'>
                          <Button variant="ghost" className="h-[40px] flex flex-col text-[#838383] hover:text-[#ff9d00]">
                            <span className='text-[10px]'>Edit</span>
                          <Image src="/form-layout-icons/editIcon.svg" alt="Edit Icon" height={16} width={16}/>
                          </Button>
                          <Button variant="ghost" className="h-[40px] flex flex-col text-[#838383] hover:text-[#ff0200]">
                            <span className='text-[10px]'>Delete</span>
                          <Image src="/form-layout-icons/deleteIcon.svg" alt="Delete Icon" height={16} width={16}/>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                {/* Tab Fields Box */}
                <div className=' mb-10'>
                  <div className='flex gap-1 items-center mb-2'>
                    <div className='w-[16px]'></div>
                    <h4>Fields</h4>
                  </div>

                  {/* Tab Name Field Box */}
                  {tab?.fields?.map((field, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                      <div className='flex gap-1 items-center w-full'>
                        <div className='h-2/3 flex items-baseline border'>
                          <Image src="/form-layout-icons/draggableIcon.svg" alt="Drag Icon" height={16} width={16}/>
                        </div>
                        <div className='w-full'>
                          <span className='text-[12px]'>{field?.name}</span>
                          <div className='flex justify-between w-full gap-3'>
                            <Input className='w-[82%]' type="text" placeholder='Enter Tab Name' name="" id="" />
                            <div className='flex justify-evenly gap-1 w-[18%]'>
                              <div className='h-[40px] w-[55px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]'>
                                <span className='text-[10px]'>Mandatory</span>
                                <Switch />
                              </div>
                              <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]">
                                <span className='text-[10px]'>Edit</span>
                                <Image src="/form-layout-icons/editIcon.svg" alt="Edit Icon" height={16} width={16}/>
                              </Button>
                              <Button variant="ghost" className="h-[40px] w-[50px] flex flex-col items-center text-[#838383] hover:text-[#ff0200]">
                                <span className='text-[10px]'>Delete</span>
                                <Image src="/form-layout-icons/deleteIcon.svg" alt="Delete Icon" height={16} width={16}/>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="mb-7" />
              </div>
            ))}
          </div>
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