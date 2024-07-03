import React, { useState } from 'react'
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
import toast from 'react-hot-toast'
export default function AddNewTab({ getter, setter, resetForm }) {
  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
  const fontStyles = [
    'Super-Light',
    'Light',
    'Medium',
    'Semi-Bold',
    'Bold',
    'Extra-Bold'
  ]
  const fontFamilies = ['Normal', 'Mono', 'Sans', 'Ariel', 'Times']
  const fontColours = ['Black', 'White', 'Red', 'Blue', 'Yellow', 'Green']

  const [tabName, setTabName] = useState('')
  const [minLen, setMinLen] = useState('')
  const [maxLen, setMaxLen] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [fontStyle, setFontStyle] = useState('Bold')
  const [fontFamily, setFontFamily] = useState('Normal')
  const [fontColour, setFontColour] = useState('Black')

  const handleSubmit = async () => {
    const data = {
      containerType: 0,
      parentContainerId: "00000000-0000-0000-0000-000000000000",
      formVersionId: "aaeaf5b0-079f-48fa-c4da-08dc950b4ce7",
      fontSize:fontSize.toString(),
      fontFamily:fontFamily,
      fontColor:fontColour,
      containerName:tabName,
    }

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/CreateContainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': 'b561073e-d25b-4057-a1d3-7299129ff0f2'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        // Handle success (e.g., show a success message, close the dialog, etc.)
        console.log('Tab saved successfully')
        let responseData=await response.json()
        setter(!getter);
        toast.success(responseData.notificationMessage)
        resetForm();
      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to save tab')
        toast.error("Failed to save tab!");
      }
    } catch (error) {
      console.error('An error occurred while saving the tab:', error)
      toast.error("Something went wrong!");
    }
  }

  return (
    <div>
      <DialogTitle>Add Tab</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-4">
        <div className="col-span-2">
          <label htmlFor="tabName" className="text-xs font-semibold">
            Tab Name
          </label>
          <Input
            name="tabName"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
        </div>

    

        <div>
          <label htmlFor="fontFamily" className="text-xs font-semibold">
            Font Family
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontFamily(e)}
            defaultValue={fontFamily}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="fontSize" className="text-xs font-semibold">
            Font Size
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontSize(Number(e))}
            defaultValue={fontSize}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size, index) => (
                <SelectItem key={index} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

       
        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Font Colour
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontColour(e)}
            defaultValue={fontColour}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontColours.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-4 py-1 my-4">
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