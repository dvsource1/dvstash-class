import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

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

    return NextResponse.json(student)
  } catch (err) {
    console.error('[API/STUDENT | POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
