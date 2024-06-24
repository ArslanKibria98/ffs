'use client'
import React, { useState, useEffect } from 'react'

import { store } from '@/redux/store';
import { useSelector } from 'react-redux'
import { SET_USER_INFO } from '@/redux/store/auth';

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FieldInfo from '@/components/form-builder/FieldInfo'

import TabSection from '@/components/form-builder/TabSection'
import BuildTab from '@/components/form-builder/tabs/BuildTab'
import StyleTab from '@/components/form-builder/tabs/StyleTab'

import AddNewTab from '@/components/form-builder/controls/AddNewTab'
import AddTextField from '@/components/form-builder/controls/AddTextField'
import RadioButton from '@/components/form-builder/controls/RadioButton'
import DropDown from '@/components/form-builder/controls/DropDown'
import LosControl from '@/components/form-builder/controls/LosControl'
import Calendar from '@/components/form-builder/controls/Calendar'
import FileUpload from '@/components/form-builder/controls/FileUpload'
import AddOtp from '@/components/form-builder/controls/AddOtp'
import Checkbox from '@/components/form-builder/controls/Checkbox'
import Time from '@/components/form-builder/controls/Time'
import PhoneNumber from '@/components/form-builder/controls/PhoneNumber'
import Table from '@/components/form-builder/controls/Table'
import Signature from '@/components/form-builder/controls/Signature'
import Captcha from '@/components/form-builder/controls/Captcha'
import AddButton from '@/components/form-builder/controls/AddButton'
import Rating from '@/components/form-builder/controls/Rating'
import EmailAddress from '@/components/form-builder/controls/EmailAddress'
import List from '@/components/form-builder/controls/List'
import Slider from '@/components/form-builder/controls/Slider'

function Page() {
  const [region, setRegion] = useState()

  const controlList = [
    {
      icon: '/control-icons/addNewTab.svg',
      title: 'Add New Tab',
      data: <AddNewTab />
    },
    {
      icon: '/control-icons/addTextField.svg',
      title: 'Add Text Field',
      data: <AddTextField />
    },
    {
      icon: '/control-icons/addRadioButton.svg',
      title: 'Radio Button',
      data: <RadioButton />
    },
    {
      icon: '/control-icons/addDropDown.svg',
      title: 'Drop Down',
      data: <DropDown />
    },
    {
      icon: '/control-icons/addLOSControl.svg',
      title: 'LOS Control',
      data: <LosControl />
    },
    {
      icon: '/control-icons/addCalander.svg',
      title: 'Calendar',
      data: <Calendar />
    },
    {
      icon: '/control-icons/addFileUpload.svg',
      title: 'File Upload',
      data: <FileUpload />
    },
    {
      icon: '/control-icons/addOtp.svg',
      title: 'Add OTP',
      data: <AddOtp />
    },
    {
      icon: '/control-icons/addCheckbox.svg',
      title: 'Checkbox',
      data: <Checkbox />
    },
    {
      icon: '/control-icons/addTime.svg',
      title: 'Time',
      data: <Time />
    },
    {
      icon: '/control-icons/addPhone.svg',
      title: 'Phone Number',
      data: <PhoneNumber />
    },
    {
      icon: '/control-icons/addTable.svg',
      title: 'Table',
      data: <Table />
    },
    {
      icon: '/control-icons/addSignature.svg',
      title: 'Signature',
      data: <Signature />
    },
    {
      icon: '/control-icons/addCaptcha.svg',
      title: 'Captcha',
      data: <Captcha />
    },
    {
      icon: '/control-icons/addButton.svg',
      title: 'Button',
      data: <AddButton />
    },
    {
      icon: '/control-icons/addRating.svg',
      title: 'Rating',
      data: <Rating />
    },
    {
      icon: '/control-icons/addEmailAddress.svg',
      title: 'Email Address',
      data: <EmailAddress />
    },
    {
      icon: '/control-icons/addList.svg',
      title: 'List',
      data: <List />
    },
    {
      icon: '/control-icons/addSlider.svg',
      title: 'Slider',
      data: <Slider />
    }
  ]
  const LeadingList = [
    {
      icon: '/leading-icons/addLoanCalculator.svg',
      title: 'Loan Calculator',
      func: () => {
        alert('Button')
      }
    },
    {
      icon: '/leading-icons/addVehicleEvaluator.svg',
      title: 'Vehicle Evaluator',
      func: () => {
        alert('Button')
      }
    }
  ]

  const countryList = [
    {
      name: 'Saudia Arabia',
      value: 'KSA'
    },
    {
      name: 'Yemen',
      value: 'YME'
    }
  ]

  const selectedRegionOptions = [
    {
      name: 'Yakeen Lite (Mobile Ownership Verification)',
      value: 'yakeen-lite'
    },
    {
      name: 'Nafath Biometric Lite',
      value: 'nafath-bio-lite'
    },
    {
      name: 'Nafath Biometric Full',
      value: 'nafath-bio-full'
    },
    {
      name: 'Unifonic OTP',
      value: 'unifonic-otp'
    },
    {
      name: 'Unifonic SMS',
      value: 'unifonic-sms'
    },
    {
      name: 'Unifonic OTP',
      value: 'unifonic-otp'
    },
    {
      name: 'Unifonic SMS',
      value: 'unifonic-sms'
    }
  ]

  const styleColours1 = [
    'bg-[#1978DB]',
    'bg-[#01ADFB]',
    'bg-[#00C1D9]',
    'bg-[#009A8C]',
    'bg-[#39923C]',
    'bg-[#F11F65]',
    'bg-[#637E8D]',
    'bg-[#FF9C00]',
    'bg-[#EB4B18]',
    'bg-[#D83030]',
    'bg-[#4155B9]',
    'bg-[#242424]',
    'bg-[#FFFFFF]'
  ]

  const densities = [
    {
      name: 'Default',
      image: '/styling-icons/densityDefault.png'
    },
    {
      name: 'Smaller',
      image: '/styling-icons/densityDefault.png'
    },
    {
      name: 'Bigger',
      image: '/styling-icons/densityDefault.png'
    },
    {
      name: 'Classic',
      image: '/styling-icons/densityDefault.png'
    }
  ]

  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
  const fontStyles = [
    'Super-Light',
    'Light',
    'Medium',
    'Semi-Bold',
    'Bold',
    'Extra-Bold'
  ]

  const [fontSizeH, setFontSizeH] = useState(16)
  const [fontStyleH, setFontStyleH] = useState('Bold')
  const [fontSizeF, setFontSizeF] = useState(16)
  const [fontStyleF, setFontStyleF] = useState('Bold')

  let formData = {
    formName: 'KYC Form',
    tabs: [
      {
        id: 13278738,
        name: 'Personal Information',
        fields: [
          {
            name: 'Full Name',
            mandatory: false
          },
          {
            name: 'Phone Number',
            mandatory: true
          }
        ]
      },
      {
        id: 13278737,
        name: 'Address Information',
        fields: [
          {
            name: 'Field 2',
            mandatory: true
          }
        ]
      }
    ]
  }

  useEffect(() => {
    return () => {
      store.dispatch(SET_USER_INFO({
        email: "saif",
        role: "admin",
        nickname: "saik",
        id: 892988923
      }));
    }
  }, [])
  const authStore = useSelector((state) => state.authStore)
  console.log(authStore)

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 border border-[#d3d3d3] bg-[#fff]">
        <h4 className="font-semibold p-7 pb-4">Items Bar</h4>

        <Tabs defaultValue="build">
          <TabsList className="grid grid-cols-2 gap-1 py-1">
            <TabsTrigger value="build" className="rounded-none">
              Build
            </TabsTrigger>
            <TabsTrigger value="style" className="rounded-none font-light">
              Style
            </TabsTrigger>
          </TabsList>
          <div className="bg-[#fff]">
            <TabsContent value="build">
              <BuildTab
                controlList={controlList}
                region={region}
                setRegion={setRegion}
                countryList={countryList}
                LeadingList={LeadingList}
              />
            </TabsContent>
            <TabsContent value="style" className="px-6 py-2">
              <StyleTab
                styleColours1={styleColours1}
                styleColours2={styleColours1}
                styleColours3={styleColours1}
                densities={densities}
                fontSizes={fontSizes}
                fontSize={fontSizeH}
                setFontSize={setFontSizeH}
                fontSizeF={fontSizeF}
                setFontSizeF={setFontSizeF}
                fontStyles={fontStyles}
                fontStyle={fontStyleH}
                setFontStyle={setFontStyleH}
                fontStyleF={fontStyleF}
                setFontStyleF={setFontStyleF}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="col-span-3 mx-4">
        <div className="bg-[#fff] pb-4">
          <h3 className="font-semibold p-7 pb-0">
            Layout Bar &nbsp;&nbsp;&nbsp;&nbsp; {formData.formName}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </h3>

          <div className="p-7 pt-4 flex flex-col">
            {formData?.tabs?.map((tab, index) => (
              <TabSection key={index} tab={tab} index={index}>
                {tab?.fields?.map((field, index) => (
                  <FieldInfo field={field} key={index} />
                ))}
              </TabSection>
            ))}
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4 py-1 my-4">
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
    </div>
  )
}

export default Page
