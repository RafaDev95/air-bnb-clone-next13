import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getUser from '@/app/actions/getUser'

type Params = {
  listingId: string
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }
  const { listingId } = params

  const result = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id
    }
  })

  return NextResponse.json(result)
}
