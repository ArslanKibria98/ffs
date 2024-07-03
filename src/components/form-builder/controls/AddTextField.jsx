import React, { useState, useEffect } from 'react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox2 } from '@/components/ui/checkbox'
import { DialogTitle, DialogClose } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import toast from 'react-hot-toast'

import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from '../../../redux/store/loading'

export default function AddTextField({ getter, setter, resetForm }) {
  const dispatch = useDispatch()
  const formId = useSelector((state) => state?.formStore.form_id)

  const tabNames = ['Personal Info', 'Address Details', 'Tab 3', 'Tab 4']
  const fieldTypes = ['Numeric', 'Text', 'Email', 'Password']

  const [tabName, setTabName] = useState(tabNames[0])
  const [fieldType, setFieldType] = useState(fieldTypes[0])
  const [fieldLabel, setFieldLabel] = useState('')
  const [id, setId] = useState('')
  const [fieldName, setFieldName] = useState('')
  const [fieldPlaceholder, setFieldPlaceholder] = useState('')
  const [minLength, setMinLength] = useState('')
  const [maxLength, setMaxLength] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessagePosition, setErrorMessagePosition] = useState('option-one')
  const [isMandatory, setIsMandatory] = useState(false)
  const [formDataApi, setFormDataApi] = useState([])

  const handleSubmit = async () => {
    const formData = {
      formVersionId: formId,
      containerId: id,
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

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/CreateTextbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': '9bab662d-18ca-4cac-a2af-7d8e03008707'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        let responseData=await response.json()
        setter(!getter);
        toast.success(responseData?.notificationMessage)
        resetForm();
      } else {
        console.error('Failed to add Text field!')
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
      dispatch(setIsLoading(false))
    } catch (error) {
      console.error('Error fetching forms:', error)
      toast.error('Unable to get Form')
      dispatch(setIsLoading(false))
    }
  }
  useEffect(() => {
    return () => fetchForms()
  }, [])
  console.log(id, 'id')
  return (
    <div>
      <DialogTitle>Add Input Field</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-4">
        <h5 className="text-xl font-semibold mt-4 col-span-2">Select Tab</h5>

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

        <h5 className="text-xl font-semibold mt-4 col-span-2">Select Type</h5>

        <div className="col-span-2">
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
        </div>

        <h5 className="text-xl font-semibold mt-4 col-span-2">Field Details</h5>

        <div>
          <label htmlFor="fieldLabel" className="text-xs font-semibold">
            Field Label
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
            Field Name
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
            Field Placeholder
          </label>
          <Input
            name="fieldPlaceholder"
            placeholder="Enter Field Placeholder"
            className="p-4 h-[48px]"
            value={fieldPlaceholder}
            onChange={(e) => setFieldPlaceholder(e.target.value)}
          />
        </div>

        <h5 className="text-xl font-semibold mt-4 col-span-2">Field Length</h5>

        <div>
          <label htmlFor="minLen" className="text-xs font-semibold">
            Minimum Length
          </label>
          <Input
            name="minLen"
            placeholder="0"
            className="p-4 h-[48px]"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maxLen" className="text-xs font-semibold">
            Maximum Length
          </label>
          <Input
            name="maxLen"
            placeholder="0"
            className="p-4 h-[48px]"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </div>

        <h5 className="text-xl font-semibold mt-4 col-span-2">
          Field Validation
        </h5>

        <div>
          <label htmlFor="errorMessage" className="text-xs font-semibold">
            Error Message Text
          </label>
          <Input
            name="errorMessage"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="errorMessagePosition"
            className="text-xs font-semibold"
          >
            Error Message Position
          </label>
          <RadioGroup
            defaultValue="option-one"
            value={errorMessagePosition}
            onValueChange={setErrorMessagePosition}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="my-4 col-span-2 flex items-center space-x-2">
          <Checkbox2 checked={isMandatory} onCheckedChange={setIsMandatory} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is this a mandatory field?
          </label>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
        >
          Add Field
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
