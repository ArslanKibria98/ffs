"use client";
import React from 'react'
import ProgressBar from '@/components/progressBar/page';

function layout({
    children,
    params: { session, ...params }
  }) {
  return (
    <div className=''>
        <ProgressBar>
          <div className="bg-[#f5f5f5]">
              {children}
          </div>
        </ProgressBar>
    </div>
  )
}

export default layout