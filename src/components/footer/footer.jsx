import React from 'react'
import finovalogo from '@/assets/images/Finova.svg'
import callIcon from '@/assets/images/call.svg'

const Footer = () => {
  return (
      <div className="shadow-xl w-[100vw] bg-[#f5f5f5] grid border-t grid-cols-2 px-6 p-3">
        <div className="col-start-1 flex items-center">
          <img src={finovalogo} width={153} height={48} alt="" />
        </div>
        <div className="col-end-3 flex justify-end items-center">
          <img
            className="pl-2"
            src={callIcon}
            width={24}
            height={24}
            alt=""
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="ml-1 font-semibold text-xl">800{" "}1111{" "}810</span>
        </div>
      </div>
  )
}

export default Footer
