// import "../globals.css"
import React, { useEffect } from 'react'

import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom';
import { SET_USER_INFO } from "../redux/store/auth";

export default function AuthHandover() {
  const params=useParams()
  console.log(params)
  const dispatch = useDispatch();
  const token = params.token;

  function decodeAccessToken(token) {
    const jwt = token.split('.')
    const header = JSON.parse(atob(jwt[0]))
    const payload = JSON.parse(atob(jwt[1]))
    return { header, payload }
  }
  const decodedToken = decodeAccessToken(token)
console.log(decodedToken,"--098765")
  useEffect(() => {
    return () => {
      dispatch(
        SET_USER_INFO({
          email: 'dummy@dummy.com',
          role: decodedToken?.payload?.role || 'dummy',
          nickname: 'dummy',
          id: 'A2DEC207-EDFA-4619-BCF1-6DF55A5DD56F',
          tenant_id: 'FF2B49B3-57ED-486C-8326-53DF5BA5B5B4',
          token:token,
        })
      )
      //  window.location.href = '/form-builder';
    }
  }, [userId]);

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