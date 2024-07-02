'use client'
import "./globals.css"
import React, { useEffect } from 'react'

import { store } from '@/redux/store'
import { SET_USER_INFO } from '@/redux/store/auth'
import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation"

function page() {
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3OEQ5NkNDNEJFQkVGRTM3RjA5OERFN0YzQTU0NTM5IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MTkzMDkyMTcsImV4cCI6MTcxOTMxMjgxNywiaXNzIjoiaHR0cHM6Ly9maW5vdmFzZWMueGludGRldi5jb206MzQ0MyIsImF1ZCI6Imh0dHBzOi8vZmlub3Zhc2VjLnhpbnRkZXYuY29tOjM0NDMvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiOGJkYzExZDQtZGVkMS00MzAyLTk2ZjQtYzdlN2RhYzg2NDllIiwic3ViIjoiYWM5Yzc5OTQtM2RjNS00ZjhhLTkzOWItZjViZjdhZGQwNzY4IiwiYXV0aF90aW1lIjoxNzE5MzA5MjE3LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJUZW5hbnQgQWRtaW4iLCJ1c2VySWQiOiJIYWlkZXJBbGlKb3lpYSIsImp0aSI6IjNGQzU4MEM4RjI3OEZCODBGRDM5MTcyMDg0MkNCNDIxIiwiaWF0IjoxNzE5MzA5MjE3LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiV29ya2Zsb3dzIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.JwWi1ammBb5c9J7gbObQJJIToZsT-uNemtx6KhqHw_sPA-IbHOPioNGaxr0m3oy0UFZvSrQ6gZZwXmsyj-Be7k3ZTjyvu88WH_4gS_8ikGp67L85CutAuMOjSc5iuBJaCOdUbXo6pJOd6EzwQQwVd8oMe7Z6Nju9YMZ00cvmhnWPD0X7t-3fqdF5Ckb-pCJyMhX8RmHXWGtSYHzU2gAu-WBUxuk3s-SoVYXBB5GC-xJzsacBVPzJ3Wtr7eatMdcHQD7CcRtjGHVyeaFT-jSMso2dvi9B39-lWDovfpBeSUycMUmT0AkZWtlsxGAD4yGprxpLYfTiKUnM1hAgI6FhIA"
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
      router.push('/form-builder')
    }
  }, [])
  const authStore = useSelector((state) => state?.authStore)
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
