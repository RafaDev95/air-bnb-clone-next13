'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ListingCard, ListingsGridContainer } from '@/components'
import { Reservation, User, Listing } from '@prisma/client'
import toast from 'react-hot-toast'

type Props = {
  reservations: (Reservation & { listing: Listing })[]
  user: User
}

const TripsClient = ({ reservations, user }: Props) => {
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
      title='Your Trips'
      subtitle="Where you've been and where you are going"
    >
      {reservations?.map((reservation) => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel reservation'
          user={user}
        />
      ))}
    </ListingsGridContainer>
  )
}
export default TripsClient
