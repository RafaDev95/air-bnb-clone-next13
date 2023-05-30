/* eslint-disable @typescript-eslint/no-non-null-assertion */
import getUser from '../actions/getUser'
import getReservations from '../actions/getReservations'
import { EmptyState } from '@/components'
import TripsClient from './TripsClient'

const TripsPage = async () => {
  const user = await getUser()

  if (!user) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />
  }

  const reservations = await getReservations({ userId: user.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No trips found'
        subtitle="Looks like you haven't reserved any trips"
      />
    )
  }

  return <TripsClient reservations={reservations} user={user!} />
}
export default TripsPage
