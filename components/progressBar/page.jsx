'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import onboarding from '@/assets/images/onboardingicon.svg'
// import fieldmapping from '@/assets/images/fieldmappingicon.svg'
import Image from 'next/image'
import Select from '@mui/material/Select'
import { Button, StepIcon } from '@mui/material'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const ProgressBar = ({ children }) => {
  const pathname = usePathname();
  const [stepIndex, setStepIndex] = useState(0);

  const stepPage = [
    "/form-builder",
    "/form-builder/settings",
    "/form-builder/preview",
    "/form-builder/save",
    "/form-builder/publish"
  ]

  useEffect(() => {
    console.log(stepIndex);
    if (stepPage.includes(pathname)) {
      setStepIndex(stepPage.indexOf(pathname));
    }
  }, [pathname])

  return (
    <div className=''>
      <div className="fixed top-[79px] left-0 w-full bg-[#FFF0F0] border-t p-4 flex items-center justify-center pt-6 pb-16 z-30">
        <Link href='/form-builder' className={'p-1 rounded-full relative ' + (stepIndex >= 0 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            Adding Form Fields
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 0 ? " border-[#e2252e]" : " border-[#838383]")} />

        <Link href='/form-builder/settings' className={'p-1 rounded-full relative ' + (stepIndex >= 1 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            Form Settings
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 1 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link href='/form-builder/preview' className={'p-1 rounded-full relative ' + (stepIndex >= 2 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            Preview
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 2 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link href='/form-builder/save' className={'p-1 rounded-full relative ' + (stepIndex >= 3 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            Save
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 3 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link href='/form-builder/publish' className={'p-1 rounded-full relative ' + (stepIndex >= 4 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <Image src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            Publish Info
          </p>
        </Link>
      </div>

      <div className='mt-[196px] min-h-[70vh]'>
        {children}
      </div>
    </div>
  )
}

export default ProgressBar
