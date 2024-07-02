"use client"
import React, { useState } from 'react'
import { Select, Button } from '@mui/material'
import Link from 'next/link';
import { Input } from '@/components/ui/input'
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
function Page() {
  const [formName, setFormName] = useState('');
const router =useRouter()
  const handleChange = (event) => {
    setFormName(event.target.value);
  };
const formId=localStorage.getItem('formId')
  const handleSubmit = async () => {
    const data={
      "formId": formId,
      "FormName": formName
    }
    try {
      const response = await fetch('http://135.181.57.251:3048/api/Form/UpdateFormName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': 'e23954bb-c2fc-4c48-b47b-591c436c58a6'
        },
        body: JSON.stringify( data ),
      });

      if (response.ok) {
      let resData=await response.json()
      router.push('/form-builder/publish')
        console.log('Form submitted successfully',resData);
        toast.success(resData.notificationMessage)
        
      } else {
        
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

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
        <div className="flex flex-row-reverse gap-4 py-1 my-4">
          {/* <Link href="/form-builder/publish"> */}
            <Button
              className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
              onClick={handleSubmit}
            >
              Next
            </Button>
          {/* </Link> */}
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
            onClick={handleSubmit}
          >
            Previous
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
