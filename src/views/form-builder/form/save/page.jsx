import React, { useState } from 'react'
import { Link } from "react-router-dom"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

import { useSelector } from 'react-redux'

import BoxLoader from '@/components/BoxLoader'

export default function FormSavePage() {
  const version_id = useSelector((state) => state?.formStore.version_id)
  const form_Id = useSelector((state) => state?.formStore.form_id)

  const [localLoading, setLocalLoading] = useState(false)
  const [formName, setFormName] = useState('')
  const handleChange = (event) => {
    setFormName(event.target.value)
  }
  const handleSubmit = async () => {
    setLocalLoading(true)
    const data = {
      formId: form_Id,
      FormName: formName
    }
    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/UpdateFormName',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        let resData = await response.json()
        window.location.href = "/form-builder/form/publish";
        console.log('Form submitted successfully', resData)
        toast.success(resData.notificationMessage)
        setLocalLoading(false)
      } else {
        console.error('Failed to submit form')
        setLocalLoading(false)
      }
    } catch (error) {
      console.error('Error submitting form', error)
      setLocalLoading(false)
    }
  }

  return (
    <div className='relative overflow-visible'>
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
          <Button
            onClick={handleSubmit}
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
          >
            Next
          </Button>
          <a href={`/form-builder/form/preview`}>
            <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light">
              Previous
            </Button>
          </a>
        </div>
      </div>
        {localLoading && (
          <div className='absolute top-0 w-full h-[80vh] flex justify-center items-center bg-[#0000001d]'>
            <BoxLoader />
          </div>
        )}
    </div>
  )
}