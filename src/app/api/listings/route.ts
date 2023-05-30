import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getUser from '@/app/actions/getUser'
import { RentFormData } from '@/components/Modals/RentModal'

export const POST = async (req: Request) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }
  const body: RentFormData = await req.json()

  const { location, price, ...restData } = body

  const result = await prisma.listing.create({
    data: {
      ...restData,
      locationValue: location.value,
      price: Number(price),
      userId: user.id
    }
  })

  return NextResponse.json(result)
}
