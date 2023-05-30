import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { User } from '@prisma/client'
import useLoginModal from './useLoginModal'

type Props = {
  listingId: string
  user?: User | null
}

const useFavorite = ({ listingId, user }: Props) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || []

    return list.includes(listingId)
  }, [user, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!user) {
        return loginModal.onOpen()
      }

      try {
        let request
        let successMessage
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
          successMessage = 'Removed'
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
          successMessage = 'Favorited'
        }

        await request()
        router.refresh()
        toast.success(successMessage)
      } catch (error) {
        toast.error('Someting went wrong.')
        console.error(error)
      }
    },
    [user, hasFavorited, listingId, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite
