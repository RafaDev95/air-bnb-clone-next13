import getListingById from '@/app/actions/getListingById'
import getUser from '@/app/actions/getUser'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

type Params = {
  listingId?: string
}

const ListingPage = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const user = await getUser()

  return (
    <ListingClient user={user} listing={listing} reservations={reservations} />
  )
}
export default ListingPage
