'use client'
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

export default function AddNewTab() {
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

  const [fontSize, setFontSize] = useState(16)
  const [fontStyle, setFontStyle] = useState('Bold')
  const [fontFamily, setFontFamily] = useState('Normal')
  const [fontColour, setFontColour] = useState('Black')

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
          />
        </div>

        <div>
          <label htmlFor="minLen" className="text-xs font-semibold">
            Minimum Length
          </label>
          <Input name="minLen" placeholder="0" className="p-4 h-[48px]" />
        </div>
        <div>
          <label htmlFor="maxLen" className="text-xs font-semibold">
            Maximum Length
          </label>
          <Input name="maxLen" placeholder="0" className="p-4 h-[48px]" />
        </div>

        <div>
          <Select
            className="w-full"
            onValueChange={(e) => {
              setFontFamily(e)
            }}
            defaultValue={fontFamily}
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
              Font Family
            </label>
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
          <Select
            className="w-full"
            onValueChange={(e) => {
              setFontSize(e)
            }}
            defaultValue={fontSize}
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
              Font Size
            </label>
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
          <Select
            className="w-full"
            onValueChange={(e) => {
              setFontStyle(e)
            }}
            defaultValue={fontStyle}
          >
            <label htmlFor="maxLen" className="text-xs font-semibold">
              Font Style
            </label>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontStyles.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            className="w-full"
            onValueChange={(e) => {
              setFontColour(e)
            }}
            defaultValue={fontColour}
          >
            <label htmlFor="maxLen" className="text-xs font-semibold">
              Font Colour
            </label>
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
        >
          Save
        </Button>
        <DialogClose>
          <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  )
}
