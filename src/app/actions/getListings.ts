import prisma from '@/libs/prismadb'

export const revalidate = 60 * 60 * 60 * 24

export type ListingParams = {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathRoomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

const getListings = async (params: ListingParams) => {
  const {
    userId,
    guestCount,
    roomCount,
    bathRoomCount,
    startDate,
    endDate,
    locationValue,
    category
  } = params

  let query: any = {}

  userId && (query.userId = userId)
  category && (query.category = category)
  roomCount && (query.roomCount = { gte: +roomCount })
  guestCount && (query.guestCount = { gte: +guestCount })
  bathRoomCount && (query.bathRoomCount = { gte: +bathRoomCount })
  locationValue && (query.locationValue = locationValue)

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate }
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate }
            }
          ]
        }
      }
    }
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getListings
