import React from 'react'
import ProgressBar from '@/components/progressBar/page';

import { Outlet } from 'react-router-dom'

function BuilderLayout() {
  return (
    <div className=''>
        <ProgressBar>
          <div className="bg-[#f5f5f5]">
            <Outlet />
          </div>
        </ProgressBar>
    </div>
  )
}

export default BuilderLayout