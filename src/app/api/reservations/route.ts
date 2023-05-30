import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getUser from '@/app/actions/getUser'
import { Reservation } from '@prisma/client'

export const POST = async (req: Request) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }

  const body: Reservation = await req.json()

  const { listingId, startDate, endDate, totalPrice } = body

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          startDate,
          endDate,
          totalPrice,
          userId: user.id
        }
      }
    }
  } as any)

  return NextResponse.json(listingAndReservation)
}
