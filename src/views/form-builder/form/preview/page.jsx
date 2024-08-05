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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox2 } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import StarRating from "@/components/ui/StarRating"
// import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import BoxLoader from '@/components/BoxLoader'
import { Rating } from 'react-simple-star-rating'
import DateTimePicker from 'react-datetime-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import StarRatings from './react-star-ratings';
// import { Link } from "react-router-dom"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
export default function FormPreviewPage() {
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  // const version_id = useSelector((state) => state?.formStore.version_id);

  const [loader, setLoader] = useState(true);
  const [formDataApi, setFormDataApi] = useState([
    // {
    //   containerName: "Tab Name",
    //   controls: [
    //     { //  Text Field
    //       controlType: 0,
    //       name: "Personal Details",
    //       isRequired: true,
    //       placeholder: "Enter text here"
    //     },
    //     { //  Button
    //       controlType: 1,
    //       name: "DummyButton",
    //       isRequired: false,
    //       placeholder: "A dummy button"
    //     },
    //     { //  Slider
    //       controlType: 2,
    //       name: "Range Slider",
    //       isRequired: true,
    //       placeholder: "Select age range"
    //     },
    //     { //  File
    //       controlType: 3,
    //       name: "File Upload",
    //       isRequired: false,
    //       placeholder: "Upload File Here"
    //     },
    //     { //  Phone Number
    //       controlType: 5,
    //       name: "Phone Number",
    //       isRequired: true,
    //       placeholder: "+92 300 0000000"
    //     },
    //     { //  OTP
    //       controlType: 4,
    //       name: "DummyButton",
    //       isRequired: false,
    //       placeholder: ""
    //     },
    //   ]
    // }
  ])
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = data.find(item => item.formId === searchKey);
    setSearchResult(result);
  };
  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `http://135.181.57.251:3048/api/Form/GetFormDetailsByVersionId?FormVersionId=${version_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
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
  // var defaultTabValue = formDataApi[0]?.containerName?.toString() + "";

  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <h3 className="font-semibold text-xl mb-4">Form Fields</h3>

      {formDataApi.length > 0 && (
        <Tabs defaultValue={formDataApi[0]?.containerName}>
          <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
            {formDataApi.map((tab, index) => (
              <>
               {/* {tab.containerName!=null&& */}
              <TabsTrigger key={index} value={tab?.containerName} className="rounded p-0 px-3 h-8 w-fit">
                <h5 className='text-sm'>{tab?.containerName || 'Tab Name'}</h5>
              </TabsTrigger>
               {/* } */}
               </>
            ))}
          </TabsList>
          {formDataApi.map((tab, index) => (
            <TabsContent key={index} value={tab?.containerName} className="border bg-white p-4 rounded-xl w-full min-h-[400px]">
              <div className='h-full grid grid-cols-2 gap-3'>
                {tab?.controls?.map((field, fieldIndex) => (
                  <GetRelevantField key={fieldIndex} control={field} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {!loader && formDataApi?.length < 1 ? (
        <div className="bg-white border text-center px-10 py-20 text-gray-700 text-sm">
          No Fields in this Form!
        </div>
      ) : ""}

      {loader && formDataApi?.length < 1 && (
        <div className="text-center bg-white rounded-lg border">
          <BoxLoader />
        </div>
      )}

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
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : ( '' )}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Input
            className="border-gray-400 mt-2"
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
          {field.isRequired ? <span className="text-red-500"> *</span> : ''}
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
          {field.isRequired ? <span className="text-red-500"> *</span> : ''}
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
          {field?.question}
          {field.isRequired ? <span className="text-red-500"> *</span> : ''}
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
          {field.isRequired ? (
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
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Input
            className="border-gray-400 mt-2"
            type="text"
            name="input"
            placeholder={field?.phone_Number}
          />
        </div>
      </div>
    )
  }

  // changeRating( newRating, name ) {
  //   this.setState({
  //     rating: newRating
  //   });
  // }
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  if (field?.controlType == 8) {  //  rating
    return (
      <div>
        <p className="text-[12px] pb-1">
          {field.question}
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        
        <StarRating totalStars={5} />
        
      </div>
    )
  }
  if (field?.controlType == 6) {  //  radiobutton
    const [dropdownOptions,setDropdownOptions]=useState([])
    async function inflateOptions() {
      try {
        const response = await fetch(field.url);
    
        if (response.ok) {
          const responseOptions = await response.json();
          console.log(responseOptions.data,"responseOptions")
          setDropdownOptions(responseOptions.data)
        }
      } catch (e) {
        toast.error(e?.message);
        console.log(e)
      }
    }
    useEffect(() => {
      return () => {
        { field?.choices===null &&
          inflateOptions()
        }
       
      };
    }, [])
    return (
      <div>
      <p className="text-[12px]">
        {field.question}
        {field.isRequired ? (
          <span className="text-red-500"> *</span>
        ) : (
          ''
        )}
      </p>
      <div className="my-4 items-center">
      <RadioGroup
        className="w-100 grid grid-cols-3 gap-2"
        // onValueChange={setRadiosType}
        // defaultValue={radiosType}
      > 
      {field.choices!=null && field.choices?.map((choice, index) => (
                   <>
                   <div className='w-100 flex gap-2 pb-3'>
                   <RadioGroupItem
            value="manual"
            id="manual"
            className="border-red-500"
          />
          <Label htmlFor="manual" className="cursor-pointer">{choice?.choiceName}</Label>
                   </div>
                 
                   </>
               
              ))}
                     {field.choices===null  && dropdownOptions?.map((choice, index) => (
                   <>
                   <div className='w-100 flex gap-2 pb-3'>
          
        
          <RadioGroupItem
            value="manual"
            id="manual"
            className="border-red-500"
          />
                   <Label
                     htmlFor="terms"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                   >
                     {choice[field.displayValue]}
                   </Label>
                   </div>
                 
                   </>
               
              ))}
               </RadioGroup>
        </div>
    </div>
    )
  }
  if (field?.controlType == 9) {  //  checkBox
    const [dropdownOptions,setDropdownOptions]=useState([])
    async function inflateOptions() {
      try {
        const response = await fetch(field.url);
    
        if (response.ok) {
          const responseOptions = await response.json();
          console.log(responseOptions.data,"responseOptions")
          setDropdownOptions(responseOptions.data)
        }
      } catch (e) {
        toast.error(e?.message);
        console.log(e)
      }
    }
    useEffect(() => {
      return () => {
        { field?.choices===null &&
          inflateOptions()
        }
       
      };
    }, []) 
    return (
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className="my-4 grid grid-cols-3 items-center">
        {field.choices!=null && field.choices?.map((choice, index) => (
                     <>
                     <div className='w-100 flex gap-2 pb-3'>
                     <Checkbox2 />
                     <Label
                       htmlFor="terms"
                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                       {choice.choiceName}
                     </Label>
                     </div>
                   
                     </>
                 
                ))}
                       {field.choices===null  && dropdownOptions?.map((choice, index) => (
                     <>
                     <div className='w-100 flex gap-2 pb-3'>
                     <Checkbox2 />
                     <Label
                       htmlFor="terms"
                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                       {choice[field.displayValue]}
                     </Label>
                     </div>
                   
                     </>
                 
                ))}
          </div>
      </div>
    )
  }
  if (field?.controlType == 7) {  //  dropdown
  const [dropdownOptions,setDropdownOptions]=useState([])
    async function inflateOptions() {
      try {
        const response = await fetch(field.url);
    
        if (response.ok) {
          const responseOptions = await response.json();
          console.log(responseOptions.data,"responseOptions")
          setDropdownOptions(responseOptions.data)
        }
      } catch (e) {
        toast.error(e?.message);
        console.log(e)
      }
    }
    useEffect(() => {
      return () => {
        { field?.choices===null &&
          inflateOptions()
        }
       
      };
    }, [])  
    return (
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className="my-3 items-center">
        <Select
              className="w-full"
              onValueChange={(e) => {
                // setId(e);
              }}
              // defaultValue={formDataApi[0]?.containerName}
            >
              <SelectTrigger className="w-full h-[40px]">
                <SelectValue placeholder="Select Tab" />
              </SelectTrigger>
              <SelectContent>
                {field.choices!=null && field.choices?.map((style, index) => (
                  <SelectItem key={index} value={style?.id}>
                    {style?.choiceName}
                  </SelectItem>
                ))}
                   {field.choices===null && dropdownOptions?.map((style, index) => (
                  <SelectItem key={index} value={style[field.valueField]}>
                    {style[field.displayValue]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        {/* {field.choices?.map((choice, index) => (
                     <>
                     <div className='w-100 flex gap-2 pb-3'>
                     <Checkbox2 />
                     <label
                       htmlFor="terms"
                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                       {choice.choiceName}
                     </label>
                     </div>
                   
                     </>
                 
                ))} */}
          </div>
      </div>
    )
  }
  const [value, onChange] = useState(new Date());
  if (field?.controlType == 10) {  //  time
    return (
      <div>
        <p className="text-[12px] pb-1">
          {field.question}
          {field.isRequired ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <DateTimePicker  onChange={onChange} value={value} disableCalendar={true} format={field.timeFormat==0?"hh:mm a":"HH:MM"} />
      </div>
    )
  }
}
