'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

import { useSelector } from 'react-redux'

function Page() {
  const formId = useSelector((state) => state?.formStore.form_id)

  const [formName, setFormName] = useState('')
  const router = useRouter()
  const handleChange = (event) => {
    setFormName(event.target.value)
  }
  const handleSubmit = async () => {
    const data = {
      formId: formId,
      FormName: formName
    }
    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/UpdateFormName',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id': 'e23954bb-c2fc-4c48-b47b-591c436c58a6'
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        let resData = await response.json()
        router.push(`/form-builder/${formId}/publish`)
        console.log('Form submitted successfully', resData)
        toast.success(resData.notificationMessage)
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form', error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-[400px] flex justify-center w-full font-bold pt-6">
          Form Name
        </div>
      </div>
      <div className="block max-w-[400px] w-full mx-auto mt-4">
        <label>Form Name</label>
        <Input
          className="max-w-[400px] w-full"
          id="form-name-input"
          placeholder="Enter name"
          value={formName}
          onChange={handleChange}
        />
      <div className="flex flex-row-reverse gap-4 py-4 my-4">
        {/* <Link href={`/form-builder/${formId}/publish`}> */}
          <Button
            onClick={handleSubmit}
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
          >
            Next
          </Button>
        {/* </Link> */}
        <Link href={`/form-builder/${formId}/preview`}>
        <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light">
          Previous
        </Button>
        </Link>
      </div>
      </div>
    </>
  )
}

export default Page
