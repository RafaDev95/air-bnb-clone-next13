import getUser from '../actions/getUser'
import getReservations from '../actions/getReservations'
import { EmptyState } from '@/components'
import ReservationsClient from './ReservationsClient'

const ReservationsPage = async () => {
  const user = await getUser()

  if (!user) return null

  const reservations = await getReservations({ authorId: user.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No reservations found'
        subtitle='Looks like you have no reservations on your properties'
      />
    )
  }
  return <ReservationsClient reservations={reservations} user={user} />
}
export default ReservationsPage
