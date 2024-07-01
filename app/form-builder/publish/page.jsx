import React from 'react'
import Image from 'next/image'
import successIcon from '@/assets/images/SuccessIcon.svg'
import { Button } from '@mui/material'
const page = () => {
  return (
    <>
      <div className="px-4 bg-[#FAFAFA] grid grid-cols-1">
        <div className="bg-[white] grid p-4 flex justify-center mt-8">
          <div className="grid items-center leading-8 text-center mt-8">
            <div className='flex items-center justify-center mb-6'>
          <Image src={successIcon} />
          </div>
            <div className="font-bold text-4xl">Thank You!</div>
            <div>Form ID : F-12345</div>
            <div>Date : 25/03/2024</div>
            <div className='underline '>Access URL :<span className=''> http://8.213.12.345/notifications/sms-in-app/without-template</span></div>
            <div>Your draft Form has been created. Click here to publish your unpublished forms.</div>
            <div className='flex justify-center gap-4 mt-6'>
                <Button className='bg-[#292929] p-4 rounded-xl text-white'>Back to Home</Button>
                <Button className='bg-[#E2242E] p-4 rounded-xl text-white'>View HTML Tag</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page