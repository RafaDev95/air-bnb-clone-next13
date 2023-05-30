import prisma from '@/libs/prismadb'

type ParamsProps = {
  listingId?: string
}

const getListingById = async (params: ParamsProps) => {
  try {
    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    })

    if (!listing) {
      return null
    }

    return listing
  } catch (error: any) {
    throw new Error(error)
  }
}
export default getListingById
