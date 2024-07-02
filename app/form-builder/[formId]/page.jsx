'use client'
import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from "@/redux/store/loading";

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FieldInfo from '@/components/form-builder/FieldInfo'
import Link from 'next/link'

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

import toast from 'react-hot-toast'
import BoxLoader from '@/components/BoxLoader'
import { SET_FORM_ID } from '@/redux/store/form';

import localisationData from "@/localisation.json"

function Page({ params }) {
  // alert(params.formId);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loadingStore.value);
  const userId = useSelector((state) => state?.authStore.id);
  const tenantId = useSelector((state) => state?.authStore.tenant_id);
  const language = useSelector((state) => state.language.language);
  let locData = localisationData.formBuilder.en;
  if (language == "en") {
    locData = localisationData.formBuilder.en;
  } else if (language == "ar") {
    locData = localisationData.formBuilder.ar;
  }

  const formId = useSelector((state) => state?.formStore.form_id);
  
  console.log(formId, "formId");
  useEffect(() => {
    if (!formId || formId == "") {
      console.log("Redux state found empty, dispatching!");
      dispatch(SET_FORM_ID(params.formId));
    } else {
      console.log("Redux state FILLED")
    }
  }, [formId, params.formId]);

  const [region, setRegion] = useState()
  
  const [usAddNewTab, setAddNewTab] = useState(false)
  const [usAddTextField, setAddTextField] = useState(false)
  const [usRadioButton, setRadioButton] = useState(false)
  const [usDropDown, setDropDown] = useState(false)
  const [usLosControl, setLosControl] = useState(false)
  const [usCalendar, setCalendar] = useState(false)
  const [usFileUpload, setFileUpload] = useState(false)
  const [usAddOtp, setAddOtp] = useState(false)
  const [usCheckbox, setCheckbox] = useState(false)
  const [usTime, setTime] = useState(false)
  const [usPhoneNumber, setPhoneNumber] = useState(false)
  const [usTable, setTable] = useState(false)
  const [usSignature, setSignature] = useState(false)
  const [usCaptcha, setCaptcha] = useState(false)
  const [usAddButton, setAddButton] = useState(false)
  const [usRating, setRating] = useState(false)
  const [usEmailAddress, setEmailAddress] = useState(false)
  const [usList, setList] = useState(false)
  const [usSlider, setSlider] = useState(false)

  const [fontSizeH, setFontSizeH] = useState(16)
  const [formDataApi, setFormDataApi] = useState([])
  const [fontStyleH, setFontStyleH] = useState('Bold')
  const [fontSizeF, setFontSizeF] = useState(16)
  const [fontStyleF, setFontStyleF] = useState('Bold')

  const controlModalManager = [
    usAddNewTab,
    usAddTextField,
    usRadioButton,
    usDropDown,
    usLosControl,
    usCalendar,
    usFileUpload,
    usAddOtp,
    usCheckbox,
    usTime,
    usPhoneNumber,
    usTable,
    usSignature,
    usCaptcha,
    usAddButton,
    usRating,
    usEmailAddress,
    usList,
    usSlider,
  ];
  const controlModalSetterManager = [
    setAddNewTab,
    setAddTextField,
    setRadioButton,
    setDropDown,
    setLosControl,
    setCalendar,
    setFileUpload,
    setAddOtp,
    setCheckbox,
    setTime,
    setPhoneNumber,
    setTable,
    setSignature,
    setCaptcha,
    setAddButton,
    setRating,
    setEmailAddress,
    setList,
    setSlider,
  ];
  function controlModalModifier(index) {
    controlModalSetterManager[index](!controlModalManager[index]);
  }
  const fetchForms = async () => {
    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/GetFormByVersionId?FormVersionId=aaeaf5b0-079f-48fa-c4da-08dc950b4ce7',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id': 'eef836f0-1a0d-43e5-8200-b02fe4730ce4'
          }
        }
      )
      const data = await response.json()
      
      setFormDataApi(data?.data?.containers)
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error('Error fetching forms:', error)
      toast.error("Unable to get Form");
      dispatch(setIsLoading(false));
    }
  }

  const controlList = [
    {
      icon: '/control-icons/addNewTab.svg',
      title: 'Add New Tab',
      data: <AddNewTab getter={usAddNewTab} setter={setAddNewTab} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addTextField.svg',
      title: 'Add Text Field',
      data: <AddTextField getter={usAddTextField} setter={setAddTextField} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addRadioButton.svg',
      title: 'Radio Button',
      data: <RadioButton getter={usRadioButton} setter={setRadioButton} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addDropDown.svg',
      title: 'Drop Down',
      data: <DropDown getter={usDropDown} setter={setDropDown} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addLOSControl.svg',
      title: 'LOS Control',
      data: <LosControl getter={usLosControl} setter={setLosControl} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addCalander.svg',
      title: 'Calendar',
      data: <Calendar getter={usCalendar} setter={setCalendar} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addFileUpload.svg',
      title: 'File Upload',
      data: <FileUpload getter={usFileUpload} setter={setFileUpload} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addOtp.svg',
      title: 'Add OTP',
      data: <AddOtp getter={usAddOtp} setter={setAddOtp} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addCheckbox.svg',
      title: 'Checkbox',
      data: <Checkbox getter={usCheckbox} setter={setCheckbox} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addTime.svg',
      title: 'Time',
      data: <Time getter={usTime} setter={setTime} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addPhone.svg',
      title: 'Phone Number',
      data: <PhoneNumber getter={usPhoneNumber} setter={setPhoneNumber} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addTable.svg',
      title: 'Table',
      data: <Table getter={usTable} setter={setTable} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addSignature.svg',
      title: 'Signature',
      data: <Signature getter={usSignature} setter={setSignature} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addCaptcha.svg',
      title: 'Captcha',
      data: <Captcha getter={usCaptcha} setter={setCaptcha} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addButton.svg',
      title: 'Button',
      data: <AddButton getter={usAddButton} setter={setAddButton} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addRating.svg',
      title: 'Rating',
      data: <Rating getter={usRating} setter={setRating} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addEmailAddress.svg',
      title: 'Email Address',
      data: <EmailAddress getter={usEmailAddress} setter={setEmailAddress} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addList.svg',
      title: 'List',
      data: <List getter={usList} setter={setList} resetForm={fetchForms} />
    },
    {
      icon: '/control-icons/addSlider.svg',
      title: 'Slider',
      data: <Slider getter={usSlider} setter={setSlider} resetForm={fetchForms} />
    }
  ]

  const LeadingList = [
    {
      icon: '/leading-icons/addLoanCalculator.svg',
      title: 'Loan Calculator',
      func: () => {
        alert('Loan Calculator Button')
      }
    },
    {
      icon: '/leading-icons/addVehicleEvaluator.svg',
      title: 'Vehicle Evaluator',
      func: () => {
        alert('Vehicle Evaluator Button')
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
      dispatch(setIsLoading(true));
      fetchForms()
    };
  }, [])

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 border border-[#d3d3d3] bg-[#fff]">
      <h4 className="font-semibold p-7 pb-4"> {locData?.itemsBar||"Items Bar"}</h4>
        <Tabs defaultValue="build">
          <TabsList className="grid grid-cols-2 gap-1 py-1">
            <TabsTrigger value="build" className="rounded-none">
              {locData?.build.name||"Build"}
            </TabsTrigger>
            <TabsTrigger value="style" className="rounded-none font-light">
              {locData?.style.name||"Style"}
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
                controlModalManager={controlModalManager}
                setControlModalManager={controlModalModifier}
                locData={locData}
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
                locData={locData.style}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="col-span-3 mx-4">
        <div className="bg-[#fff] pb-4">
          <h3 className="font-semibold p-7 pb-0">
          {locData?.layoutBar||"Layout Bar"} &nbsp;&nbsp;&nbsp;&nbsp; {formData.formName}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </h3>

          <div className="p-7 pt-4 flex flex-col">
            {formDataApi?.map((tab, index) => (
              // <>
                <TabSection key={index} tab={tab} index={index}>
                  {tab?.controls?.map((field, index) => (
                    <FieldInfo field={field} key={index} />
                  ))}
                </TabSection>
              // </>
            ))}
            {loading && formDataApi?.length < 1 ? (<><BoxLoader /></>) : ""}
            {!loading && formDataApi?.length < 1 ? (<p className='text-sm text-center text-gray-600'>
              Form Empty!
            </p>) : ""}
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4 py-1 my-4">
          <Link href={`/form-builder/${formId}/settings`}>
            <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg">
              Next
            </Button>
          </Link>
          <Link href="/form-builder">
          <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light"
          >
            Previous
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
