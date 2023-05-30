import { EmptyState } from '@/components'
import getFavoriteListings from '../actions/getFavoriteListings'
import getUser from '../actions/getUser'
import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
  const favoriteListings = await getFavoriteListings()
  const user = await getUser()

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle="Looks like you've no favorite listings"
      />
    )
  }

  return <FavoritesClient listings={favoriteListings} user={user} />
}
export default FavoritesPage
