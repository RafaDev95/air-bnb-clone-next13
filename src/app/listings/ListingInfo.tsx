'use client'

import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import { User } from '@prisma/client'
import useCountries from '@/hooks/useCountries'
import { Avatar } from '@/components'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false
})

type Props = {
  user: User
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  description: string
  roomCount: number
  guestCount: number
  bathRoomCount: number
  locationValue: string
}

const ListingInfo = ({
  bathRoomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user
}: Props) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 text-xl font-semibold'>
          <p>Hosted by {user?.name}</p>
          <Avatar src={user?.image} />
        </div>
        <div
          className='flex items-center gap-4 font-light
         text-neutral-400'
        >
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathRoomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className='text-lg font-light text-neutral-500'>{description}</p>
      <Map center={coordinates} />
    </div>
  )
}
export default ListingInfo
