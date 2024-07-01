import React from 'react'
import { Select, Button } from '@mui/material'
import Link from 'next/link';
function page() {
  return (
    <>
    <div className="flex items-center justify-center ">
    <div className=" max-w-[400px] flex justify-center w-full font-bold pt-6">
      Form Name
    </div>
  </div>
  <div className="block max-w-[400px] w-full mx-auto mt-4">
    <label>Form Name</label>
    <Select
      className="max-w-[400px] w-full"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="value"
      placeholder="Kyc"
    />
    <div className="flex flex-row-reverse gap-4 py-1 my-4">
    <Link href="/form-builder/publish">
    <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
          >
            Next
          </Button>
          </Link>
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          // onClick={handleSubmit}
        >
          Previous
        </Button>
  
         
    
      </div>
  </div>
  </>
  )
}

export default page