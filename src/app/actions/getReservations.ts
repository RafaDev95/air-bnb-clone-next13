import prisma from '@/libs/prismadb'

type ParamsProps = {
  listingId?: string
  userId?: string
  authorId?: string
}

const getReservations = async ({
  authorId,
  listingId,
  userId
}: ParamsProps) => {
  try {
    const query: any = {}

    userId && (query.userId = userId)
    listingId && (query.listingId = listingId)
    authorId && (query.listing = { userId: authorId })

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return reservations
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getReservations
