'use client'
import React from 'react'
import Image from 'next/image'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setLanguage } from '@/redux/store/language/actions'

import finovalogo from '@/assets/images/Finova.svg'
import { Button } from '@/components/ui/button'

const Header = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };
    
  return (
    <>
      <div className="fixed top-0 left-0 w-full mx-auto px-2 flex bg-[#FFF0F0] z-50">
        <div className="p-4 flex justify-between w-full">
          <div className="flex-1">
            <Image src={finovalogo} width={153} height={48} alt="" />
          </div>
          <div className="flex-2 flex items-center">
            <Button onClick={() => handleLanguageChange('en')} className={(language == "en" ? "bg-[#E2242E] hover:bg-[#ff0200] text-white " : "bg-[#ececec] hover:bg-[#dadada] text-black ") + " rounded-r-none"}>EN</Button>
            <Button onClick={() => handleLanguageChange('ar')} className={(language == "ar" ? "bg-[#E2242E] hover:bg-[#ff0200] text-white " : "bg-[#ececec] hover:bg-[#dadada] text-black ") + " rounded-l-none"}>AR</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header