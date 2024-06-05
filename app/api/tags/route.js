import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  try {
    // console.log('rew',req)

    // Assuming you have a User model with tags field
    const allUsers = await prisma.user.findMany({
      select: { tags: true }
    })

    // console.log('allUsers',allUsers)
    // Extract tags from all users
    const allTags = allUsers?.map((user) => user.tags || []).flat()

    return NextResponse.json({ success: true, data: allTags })
  } catch (error) {
    console.log('eere', error)
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req, res) {
  try {
    // Assuming you have a User model with tags field
    const { userId, newTags } = await req.json() // Adjust this based on your request structure

    // Check if newTags is not an empty array and contains valid tags
    if (
      !Array.isArray(newTags) ||
      newTags.length === 0 ||
      newTags.some((tag) => !tag.trim())
    ) {
      throw new Error('Tag should not be a empty string')
    }

    // Fetch the existing tags for the user (replace this with your actual logic)
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { tags: true }
    })

    // Check if any new tag already exists
    if (existingUser.tags.some((tag) => newTags.includes(tag))) {
      throw new Error('Tag already exists')
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        tags: {
          push: newTags // Assuming tags is an array field in your schema
        }
      },
      select: { tags: true }
    })

    return NextResponse.json({ success: true, data: updatedUser.tags })
  } catch (error) {
    console.error('Error in POST API route:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  try {
    // Assuming you have a User model with tags field
    const { userId, newTags } = await req.json() // Adjust this based on your request structure

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { tags: true }
    })

    // Update the user, excluding the tagToDelete
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        tags: {
          set: existingUser.tags.filter((tag) => tag != newTags)
        }
      },
      select: { tags: true }
    })

    return NextResponse.json({ success: true, data: updatedUser.tags })
  } catch (error) {
    console.error('Error in POST API route:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
