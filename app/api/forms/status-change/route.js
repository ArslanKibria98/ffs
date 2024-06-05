import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(req, res) {
  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Checking if Session exists
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized!' }, { status: 500 })
    }

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const formId = searchParams.get('formId')
    let type = searchParams.get('status')

    if (!email && !formId) {
      return NextResponse.json(
        { error: 'Email or FormID is required!' },
        { status: 500 }
      )
    }
    // Make sure user is getting his own form/s
    if (email && session.email !== email) {
      return NextResponse.json({ error: 'Unauthorized!' }, { status: 500 })
    }

    if (type == 'true') {
      type = true
    } else if (type == 'false') {
      type = false
    } else {
      return NextResponse.json({ error: 'Invalid form type!' }, { status: 500 })
    }
    // console.log("============ " + type)
    const form = await prisma.form.update({
      where: {
        id: formId,
        userEmail: session.email
      },
      data: {
        type: type
      }
    })
    return NextResponse.json({ success: true, data: form })
  } catch (error) {
    console.log('error', error)
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
