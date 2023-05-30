import { NextResponse } from 'next/server'

import getUser from '@/app/actions/getUser'
import prisma from '@/libs/prismadb'

type Params = {
  listingId?: string
}

export const POST = async (req: Request, { params }: { params: Params }) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(user.favoriteIds || [])]

  favoriteIds.push(listingId)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(updatedUser)
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  const user = await getUser()

  if (!user) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(user.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== listingId)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(updatedUser)
}
