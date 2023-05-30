/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Heading, HeartButton } from '@/components'
import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import Image from 'next/image'

type Props = {
  title: string
  imageSrc: string
  locationValue: string
  description: string
  id: string
  user: User | null
}

const ListingHead = ({
  title,
  imageSrc,
  description,
  locationValue,
  id,
  user
}: Props) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue!)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
        <Image
          alt={description}
          src={imageSrc}
          fill
          className='w-full object-cover'
        />
        <div className='absolute right-5 top-5'>
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  )
}
export default ListingHead
