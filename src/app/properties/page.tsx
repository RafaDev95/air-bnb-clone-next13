/* eslint-disable @typescript-eslint/no-non-null-assertion */
import getUser from '../actions/getUser'
import { EmptyState } from '@/components'
import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'

const PropertiesPage = async () => {
  const user = await getUser()

  if (!user) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />
  }

  const listings = await getListings({ userId: user.id })

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        subtitle='Looks like you have no properties'
      />
    )
  }

  return <PropertiesClient listings={listings} user={user!} />
}
export default PropertiesPage
