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
import axios from "@/lib/axios";
import toast from 'react-hot-toast'

import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from '../../../redux/store/loading'

export default function AddTextField({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id)
  const default_id = useSelector((state) => state?.formStore.default_id);
  // console.log(updateFieldData);

  const fieldTypes = ['Numeric', 'Text', 'Email', 'Password']

  const [fieldType, setFieldType] = useState(!isUpdate ? fieldTypes[0] : updateFieldData.inputType)
  const [fieldLabel, setFieldLabel] = useState(!isUpdate ? "" : updateFieldData.name)
  const [id, setId] = useState("")
  const [fieldName, setFieldName] = useState(!isUpdate ? "" : updateFieldData.name)
  const [fieldPlaceholder, setFieldPlaceholder] = useState(!isUpdate ? "" : updateFieldData.placePlaceholder)
  const [minLength, setMinLength] = useState(!isUpdate ? "" : updateFieldData.minLength)
  const [maxLength, setMaxLength] = useState(!isUpdate ? "" : updateFieldData.maxLength)
  const [errorMessage, setErrorMessage] = useState(!isUpdate ? "" : updateFieldData.errorMsgTxt)
  const [errorMessagePosition, setErrorMessagePosition] = useState(!isUpdate ? 'option-one' : updateFieldData.errorMsgPosition)
  const [isMandatory, setIsMandatory] = useState(!isUpdate ? false : updateFieldData.isRequired)

  const handleSubmit = async () => {
    const formData = {
      formVersionId: version_id,
      containerId: id?id:default_id,
      regionId: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
      name: fieldName,
      default_Value: 'abc',
      inputType: fieldType,
      fieldLabel,
      fieldName,
      placeholder: fieldPlaceholder,
      minLength: minLength,
      maxLength: maxLength,
      errorMsgTxt: errorMessage,
      errorMsgPosition: "option-one",
      isRequired: isMandatory
    }
    console.log(formData)
    // return;
    try {
      const response = await axios.post("/Controls/CreateTextbox", JSON.stringify(formData));

      if (response?.data?.success) {
        let responseData=response.data
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

  const handleUpdate = async () => {
    const formUpdateData = {
      id: updateFieldData.controlId,
      controlId: updateFieldData.controlId,
      name: fieldName,
      placeholder: fieldPlaceholder,
      default_Value: "string",
      inputType: fieldType,
      minLength: minLength,
      maxLength: maxLength,
      errorMsgTxt: errorMessage,
      errorMsgPosition: errorMessagePosition,
      isRequired: isMandatory
    }
    
    try {
      const response = await axios.post("/Controls/UpdateTextbox", JSON.stringify(formUpdateData));
      if (response?.data?.success) {
        let responseData = response.data;
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          return;
        }
        toast.success(responseData?.notificationMessage)
        resetForm();
        document.getElementById("TFDialogClose").click();
      } else {
        console.error('Failed to edit Text field!')
        toast.error("Unable to edit!")
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("Something went wrong!")
    }
  }
  
  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add " : "Edit "} Input Field</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-4">
        {!isUpdate && (
          <>
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
                  <SelectValue placeholder="Select Tab" />
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
          </>
        )}

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
        {/* <div>
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
              <Label htmlFor="option-one">Error above field</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Error below field</Label>
            </div>
          </RadioGroup>
        </div> */}

        <div className="my-4 col-span-2 flex items-center space-x-2">
          <Checkbox2 checked={isMandatory} onCheckedChange={(e)=>setIsMandatory(e)} />
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
          onClick={!isUpdate ? handleSubmit : handleUpdate}
          disabled={loading}
        >
          {!isUpdate ? "Add " : "Save "} Field
        </Button>
        <DialogClose id='TFDialogClose' className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  )
}
