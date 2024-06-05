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
      <div className="bg-[#FFF0F0] border-t p-4 flex justify-center">
        <Box sx={{ width: '50%' }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                 <img src="/fieldmappingicon.svg" alt="" />
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </>
  )
}

export default ProgressBar
