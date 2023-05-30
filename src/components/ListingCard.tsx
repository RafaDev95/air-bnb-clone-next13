'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns'

import useCountries from '@/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'
import { HeartButton, Button } from '@/components'

type Props = {
  data: Listing
  user: User | null
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}

const ListingCard = ({
  data,
  reservation,
  user,
  actionId = '',
  actionLabel,
  disabled,
  onAction
}: Props) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data?.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation?.totalPrice
    }

    return data.price
  }, [reservation?.totalPrice, data?.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const startDate = new Date(reservation?.startDate)
    const endDate = new Date(reservation?.endDate)

    return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='group col-span-1 cursor-pointer'
    >
      <div className='flex w-full flex-col gap-2'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <Image
            alt='Listing'
            src={data.imageSrc}
            fill
            className='h-full w-full object-cover transition group-hover:scale-110'
          />
          <div className='absolute right-3 top-3'>
            <HeartButton listingId={data.id} user={user} />
          </div>
        </div>
        <p className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </p>
        <p className='text-sm text-neutral-400'>
          {reservationDate || data.category}
        </p>
        <div className='flex items-center gap-1'>
          <p className='font-semibold'>$ {price}</p>
          {!reservation && <p className='font-light'>night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
export default ListingCard
