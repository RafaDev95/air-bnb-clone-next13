import getListings, { ListingParams } from './actions/getListings'
import getUser from './actions/getUser'
import { Container, EmptyState, ListingCard } from '../components'

type Props = {
  searchParams: ListingParams
}

const Home = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams)
  const user = await getUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} user={user} />
        ))}
      </div>
    </Container>
  )
}

export default Home
