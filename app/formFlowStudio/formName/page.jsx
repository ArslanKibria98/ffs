'use Client'
import React from 'react'
import { Select, Button } from '@mui/material'

const formName = () => {
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
        <div className="mx-auto flex justify-center mt-[2rem] gap-2">
          <Button className="bg-[#BEBEBE] " variant="contained">
            Previous
          </Button>
          <Button className="bg-[#E2242E] " variant="contained">
            Next
          </Button>
        </div>
      </div>
    </>
  )
}

export default formName
