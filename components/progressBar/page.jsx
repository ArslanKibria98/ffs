'use client'
import React, { useState } from 'react'
import onboarding from '@/assets/images/onboardingicon.svg'
// import fieldmapping from '@/assets/images/fieldmappingicon.svg'
import Image from 'next/image'
import Select from '@mui/material/Select'
import { Button, StepIcon } from '@mui/material'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
const ProgressBar = () => {
  const steps = [
    'Adding Form Fields',
    'Form Settings',
    'Preview',
    'Save',
    'Publish Info'
  ]
  return (
    <>
      <div className="bg-[#FFF0F0] border-t p-4 flex items-center justify-center pt-6 pb-16">
        <button className='p-1 bg-[#e2252e] rounded-full relative'>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20}/>
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px] text-black'>
          Adding Form Fields
          </p>
        </button>

        <hr className='w-[144px] border-[#E2242E]' />
        
        <button className='p-1 bg-[#838383] rounded-full relative'>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20}/>
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px] text-[#838383]'>
          Form Settings
          </p>
        </button>

        <hr className='w-[144px]' />

        <button className='p-1 bg-[#838383] rounded-full relative'>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20}/>
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px] text-[#838383]'>
            Preview
          </p>
        </button>

        <hr className='w-[144px]' />

        <button className='p-1 bg-[#838383] rounded-full relative'>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20}/>
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px] text-[#838383]'>
            Save
          </p>
        </button>

        <hr className='w-[144px]' />

        <button className='p-1 bg-[#838383] rounded-full relative'>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20}/>
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px] text-[#838383]'>
            Publish Info
          </p>
        </button>
      </div>
    </>
  )
}

export default ProgressBar
