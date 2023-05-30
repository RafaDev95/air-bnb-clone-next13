'use client'

import { ListingCard, ListingsGridContainer } from '@/components'
import { User, Listing } from '@prisma/client'

type Props = {
  listings: Listing[]
  user: User | null
}

const FavoritesClient = ({ listings, user }: Props) => {
  return (
    <ListingsGridContainer
      title='Favorites'
      subtitle='List of places you have favorited!'
    >
      {listings.map((listing) => (
        <ListingCard user={user} key={listing.id} data={listing} />
      ))}
    </ListingsGridContainer>
  )
}
export default FavoritesClient
