'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ListingCard, ListingsGridContainer } from '@/components'
import { Reservation, Listing, User } from '@prisma/client'

type Props = {
  reservations: (Reservation & { listing: Listing })[]
  user: User
}

const ReservationsClient = ({ reservations, user }: Props) => {
  const router = useRouter()

  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        await axios.delete(`/api/reservations/${id}`)

        toast.success('Reservation cancelled')
        router.refresh()
      } catch (error: any) {
        toast.error(error?.response?.data.error)
      }

      setDeletingId('')
    },
    [router]
  )

  return (
    <ListingsGridContainer
      title='Reservations'
      subtitle='Bookings on your properties'
    >
      {reservations?.map((reservation) => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel guest reservation'
          user={user}
        />
      ))}
    </ListingsGridContainer>
  )
}
export default ReservationsClient
