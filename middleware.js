// import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req) {
//   // const path = req.nextUrl.pathname

//   // const session = await getToken({
//   //   req,
//   //   secret: process.env.NEXTAUTH_SECRET
//   // })

  return NextResponse.next()
}
