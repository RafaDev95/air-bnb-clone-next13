import { NextResponse } from 'next/server'

import getUser from '@/app/actions/getUser'
import prisma from '@/libs/prismadb'

type Params = {
  reservationId: string
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: params.reservationId,
      OR: [{ userId: user.id }, { listing: { userId: user.id } }]
    }
  })

  return NextResponse.json(reservation)
}
