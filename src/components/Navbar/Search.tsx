'use client'

import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'

import useSearchModal from '@/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import useCountries from '@/hooks/useCountries'
import { differenceInDays } from 'date-fns'

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label
    }

    return 'Anywere'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      let dayDiff = differenceInDays(end, start)

      if (dayDiff === 0) {
        dayDiff = 1
      }

      return `${dayDiff} Days`
    }

    return 'Any Week'
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return 'Add Guests'
  }, [guestCount])

  return (
    <div
      className='w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto'
      onClick={searchModal.onOpen}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>{locationLabel}</div>
        <div className='hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block'>
          {durationLabel}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>{guestLabel}</div>
          <div className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Search
