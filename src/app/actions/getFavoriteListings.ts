import prisma from '@/libs/prismadb'
import getUser from './getUser'

const getFavoriteListings = async () => {
  const user = await getUser()
  try {
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user?.favoriteIds || [])]
        }
      }
    })
    return favorites
  } catch (error: any) {
    throw new Error(error)
  }
}
export default getFavoriteListings
