import prismadb from '@/lib/prismadb'
import redisdb from '@/lib/redisdb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    // if (!userId) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    if (!id) {
      return new NextResponse('User ID is required', { status: 400 })
    }

    const redisStudent = await redisdb.get(`STUDENT.${id}`)

    if (redisStudent) {
      return NextResponse.json(redisStudent)
    }

    const prismaStudent = await prismadb.student.findFirst({
      where: { id },
    })

    if (!prismaStudent) {
      return new NextResponse('User not found', { status: 400 })
    }

    redisdb.set(`STUDENT.${prismaStudent.id}`, prismaStudent)
    console.log('[API/STUDENT | GET]', prismaStudent)
    return NextResponse.json(prismaStudent)
  } catch (err) {
    console.error('[API/STUDENT | GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    console.log(body)

    const { name, grade, year } = body

    // if (!userId) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!grade) {
      return new NextResponse('Grade is required', { status: 400 })
    }

    if (!year) {
      return new NextResponse('Year is required', { status: 400 })
    }

    const student = await prismadb.student.create({
      data: {
        name,
        grade,
        year,
      },
    })

    redisdb.set(`STUDENT.${student.id}`, student)

    return NextResponse.json(student)
  } catch (err) {
    console.error('[API/STUDENT | POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
