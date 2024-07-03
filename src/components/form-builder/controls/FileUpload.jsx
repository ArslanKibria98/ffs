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

export default function FileUpload({ getter, setter, resetForm }) {
  const fontColours = ['4-digits', '5-digits', '6-digits']
  const dispatch = useDispatch();
  const otpFormatMapping = {
    '4-digits': 4,
    '5-digits': 5,
    '6-digits': 6
  }
  const formId = useSelector((state) => state?.formStore.form_id);
  const [question, setQuestion] = useState('')
  const [isRequired, setIsRequired] = useState(false)
  const [otpFormat, setOtpFormat] = useState('4-digits')
  const [formDataApi, setFormDataApi] = useState([])
  const [id, setId] = useState('');
  const [selectedFormat, setSelectedFormat] = useState([])
  const availableFormat = [
    'JPEG',
    'PNG',
    'SVG',
    'GIF',
    'TIFF',
    'PDF',
    'DOC',
    'XLS',
    'PPT',
    'ODP',
    'TXT',
    'All Files'
  ]
  const handleSubmit = async () => {
    const postData = {
      formVersionId: formId,
      containerId: id,
      regionId: "9712CB25-9053-4BF4-936C-7C279CE5DA69",
      controlType: 0,
      question: question,
      is_Required: isRequired,
      file_Format:0,
    }

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/CreateFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': 'aeb6cea3-3d50-4e58-8c87-e2cb535fefc9'
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        let responseData=await response.json()
        setter(!getter);
        toast.success(responseData?.notificationMessage)
        resetForm();
      } else {
        console.error('Failed to add OTP')
        toast.error("Unable to save!")
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Something went wrong!")
    }
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
  useEffect(() => {
    return () => fetchForms();
  }, [])
  const handleCountryChange = (country) => {
    setSelectedFormat((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    )
  }
  return (
    <div>
      <DialogTitle>Add File</DialogTitle>
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
          defaultValue={false}
          onCheckedChange={(e) => setIsRequired(e.checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required?
        </label>
        </div>
        

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
          Select File Formats
          </label>

        </div>
        <div className="col-span-2 grid grid-cols-4 gap-4">
            {availableFormat.map((country, index) => (
              <div
                key={index}
                className="col-span-1 flex items-center space-x-2"
              >
                <Checkbox2
                  checked={selectedFormat.includes(country)}
                  onCheckedChange={() => handleCountryChange(country)}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {country}
                </label>
              </div>
            ))}
          </div>
      </div>
     
      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
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
