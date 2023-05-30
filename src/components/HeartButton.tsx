'use client'

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { User } from '@prisma/client'
import { useFavorite } from '@/hooks'

type Props = {
  listingId: string
  user?: User | null
}

const HeartButton = ({ listingId, user }: Props) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, user })

  return (
    <div
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80 active:scale-95'
    >
      <AiOutlineHeart
        size={28}
        className='absolute -right-[2px] -top-[2px] fill-white'
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}
export default HeartButton
