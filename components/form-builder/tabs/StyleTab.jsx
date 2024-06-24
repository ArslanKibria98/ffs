'use client'
import React from 'react'
import Image from 'next/image'

import { isCloseToWhite } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select'

function StyleTab({
  styleColours1,
  styleColours2,
  styleColours3,
  densities,
  fontSizes,
  fontSize,
  setFontSize,
  fontSizeF,
  setFontSizeF,
  fontStyles,
  fontStyle,
  setFontStyle,
  fontStyleF,
  setFontStyleF
}) {
  return (
    <>
      <div>
        <h3>Background Colour </h3>

        <div className="grid grid-cols-7 gap-4 mt-3 mb-5">
          {styleColours1?.map((colour, index) => (
            <div
              key={index}
              className={
                colour +
                (isCloseToWhite(colour) ? ' border border-black' : '') +
                ' h-8 w-8 rounded-full shadow-inner'
              }
            ></div>
          ))}
          <div
            className={'h-8 w-8 rounded-full flex items-center justify-center'}
          >
            <Image
              src="/styling-icons/colourPicker.svg"
              alt="icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div>
        <h3>Heading Colour </h3>

        <div className="grid grid-cols-7 gap-4 my-3 mb-5">
          {styleColours2?.map((colour, index) => (
            <div
              key={index}
              className={
                colour +
                (isCloseToWhite(colour) ? ' border border-black' : '') +
                ' h-8 w-8 rounded-full shadow-inner'
              }
            ></div>
          ))}
          <div
            className={'h-8 w-8 rounded-full flex items-center justify-center'}
          >
            <Image
              src="/styling-icons/colourPicker.svg"
              alt="icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div>
        <h3>Field Colour </h3>

        <div className="grid grid-cols-7 gap-4 my-3 mb-5">
          {styleColours3?.map((colour, index) => (
            <div
              key={index}
              className={
                colour +
                (isCloseToWhite(colour) ? ' border border-black' : '') +
                ' h-8 w-8 rounded-full shadow-inner'
              }
            ></div>
          ))}
          <div
            className={'h-8 w-8 rounded-full flex items-center justify-center'}
          >
            <Image
              src="/styling-icons/colourPicker.svg"
              alt="icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div>
        <h3>Density </h3>

        <div className="grid grid-cols-4 gap-2 my-3 mb-5">
          {densities?.map((density, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={density.image}
                alt="Density img"
                width={70}
                height={80}
              />
              <p className="text-[#8e8fa3] text-[10px]">{density.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-3" />
      <div>
        <h3>Heading Font </h3>

        <div className="space-y-3 my-3 mb-5">
          <div>
            <Select
              className="w-full"
              onValueChange={(e) => {
                setFontSize(e)
              }}
              defaultValue={fontSize}
            >
              <span className="text-sm">Font Size</span>
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
              <span className="text-sm">Font Style</span>
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
        </div>
      </div>
      <Separator className="my-3" />
      <div>
        <h3>Field Font </h3>

        <div className="space-y-3 my-3 mb-5">
          <div>
            <Select
              className="w-full"
              onValueChange={(e) => {
                setFontSizeF(e)
              }}
              defaultValue={fontSizeF}
            >
              <span className="text-sm">Font Size</span>
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
                setFontStyleF(e)
              }}
              defaultValue={fontStyleF}
            >
              <span className="text-sm">Font Style</span>
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
        </div>
      </div>
    </>
  )
}

export default StyleTab
