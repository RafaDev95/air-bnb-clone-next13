'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ListingCard, ListingsGridContainer } from '@/components'
import { User, Listing } from '@prisma/client'
import toast from 'react-hot-toast'

type Props = {
  listings: Listing[]
  user: User
}

const PropertiesClient = ({ listings, user }: Props) => {
  const router = useRouter()

  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)

      try {
        await axios.delete(`/api/listings/${id}`)

        toast.success('Listing deleted')
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
      title='Your Properties'
      subtitle='List of your properties'
    >
      {listings?.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onCancel}
          disabled={deletingId === listing.id}
          actionLabel='Delete property'
          user={user}
        />
      ))}
    </ListingsGridContainer>
  )
}
export default PropertiesClient
