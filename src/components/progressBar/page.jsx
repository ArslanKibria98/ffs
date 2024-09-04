import React, { useEffect, useState } from 'react'
// import { Link } from "react-router-dom"
// import onboarding from '@/assets/images/onboardingicon.svg'
// import fieldmapping from '@/assets/images/fieldmappingicon.svg'

// import Select from '@mui/material/Select'
// import { Button, StepIcon } from '@mui/material'
// import Box from '@mui/material/Box'
// import Stepper from '@mui/material/Stepper'
// import Step from '@mui/material/Step'
// import StepLabel from '@mui/material/StepLabel'
import { Link } from 'react-router-dom';
import localisationData from "../../localisation.json"
import { useDispatch, useSelector } from 'react-redux';

const ProgressBar = ({ children }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const language = useSelector((state) => state.language.language);
  const stepPage = [
    `/form-builder/form`,
    `/form-builder/form/settings`,
    `/form-builder/form/preview`,
    `/form-builder/form/save`,
    `/form-builder/form/publish`
  ]

  useEffect(() => {
    // console.log(window.location.pathname);
    if (stepPage.includes(window.location.pathname)) {
      setStepIndex(stepPage.indexOf(window.location.pathname));
    }
  }, [window.location.pathname])
  let locData = localisationData.progressBar.en;
  // console.log(locData);

  if (language == "en") {
    locData = localisationData.progressBar.en;
  } else if (language == "ar") {
    locData = localisationData.progressBar.ar;
  }
  return (
    <div className=''>
      <div className="fixed top-[79px] left-0 w-full bg-[#FFF0F0] border-t p-4 flex items-center justify-center pt-6 pb-16 z-30">
        <Link to={`/form-builder/form`} className={'p-1 rounded-full relative ' + (stepIndex >= 0 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <img src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            {locData?.addingFormFields||"Adding Form Fields"}
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 0 ? " border-[#e2252e]" : " border-[#838383]")} />

        <Link to={`/form-builder/form/settings`} className={'p-1 rounded-full relative ' + (stepIndex >= 1 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <img src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
           
            {locData?.formSetting||" Form Settings"}
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 1 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link to={`/form-builder/form/preview`} className={'p-1 rounded-full relative ' + (stepIndex >= 2 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <img src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            
            {locData?.preview||"Preview"}
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 2 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link to={`/form-builder/form/save`} className={'p-1 rounded-full relative ' + (stepIndex >= 3 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <img src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            {locData?.save||"Save"}
          </p>
        </Link>

        <hr className={'w-[144px]  ' + (stepIndex >= 3 ? "border-[#e2252e]" : "border-[#838383]")} />

        <Link to={`/form-builder/form/publish`} className={'p-1 rounded-full relative ' + (stepIndex >= 4 ? " bg-[#e2252e] text-black" : " bg-[#838383] text-[#838383]")}>
          <img src="/fieldmappingicon.svg" alt="" width={20} height={20} />
          <p className='absolute top-12 left-[-50px] mx-auto w-[130px] text-center text-[14px]'>
            
            {locData?.PublishInfo||"Publish Info"}
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
