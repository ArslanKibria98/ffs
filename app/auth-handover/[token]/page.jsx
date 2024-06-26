'use client'
import "./style.css"
import React, { useEffect } from 'react'

import { store } from '@/redux/store'
import { SET_USER_INFO } from '@/redux/store/auth'
import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation"

function page({ params }) {
  const token = params.token
  const router = useRouter();

  function decodeAccessToken(token) {
    const jwt = token.split('.')
    const header = JSON.parse(atob(jwt[0]))
    const payload = JSON.parse(atob(jwt[1]))
    return { header, payload }
  }
  const decodedToken = decodeAccessToken(token)
  //   console.log(decodedToken.payload);

  useEffect(() => {
    return () => {
      store.dispatch(
        SET_USER_INFO({
          email: 'dummy@dummy.com',
          role: decodedToken?.payload?.role || 'dummy',
          nickname: 'dummy',
          id: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
          tenant_id: '3FA85F64-5717-4562-B3FC-2C963F66AFA6'
        })
      )
      router.push('/')
    }
  }, [])
  const authStore = useSelector((state) => state.authStore)
  //   console.log(authStore)

  return (
    <div className="min-h-[82vh] flex flex-col justify-center items-center cursor-wait">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default page
