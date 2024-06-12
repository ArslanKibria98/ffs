"use client";
import React from 'react'
import ProgressBar from '@/components/progressBar/page';
import { Button } from '@/components/ui/button'

function layout({
    children,
    params: { session, ...params }
  }) {
  return (
    <div className='h-[83vh] overflow-auto'>
        <ProgressBar />
        <div className="bg-[#f5f5f5]">
            {children}
        </div>
    </div>
  )
}

export default layout