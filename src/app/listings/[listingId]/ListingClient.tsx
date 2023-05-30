/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Listing, Reservation, User } from '@prisma/client'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

import { Container } from '@/components'
import { categories } from '@/components/Navbar/mockData'
import { ListingHead, ListingInfo, ListingReservation } from '../'
import { useLoginModal } from '@/hooks'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

type Props = {
  user: User | null
  listing:
    | (Listing & {
        user: User
      })
    | null
  reservations?: Reservation[]
}

const ListingClient = ({ listing, user, reservations = [] }: Props) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing!.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(async () => {
    if (!user) {
      return loginModal.onOpen()
    }

    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
      router.push('/trips')
    } catch (error: any) {
      toast.error('Something went wrong!')
    }
    setIsLoading(false)
  }, [totalPrice, dateRange, listing?.id, router, user, loginModal])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing!.price)
      }
    }
  }, [dateRange, listing?.price])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category)
  }, [listing?.category])

  return (
    <Container>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flexcol-wrapper-div'>
          <ListingHead
            title={listing!.title}
            description={listing!.description}
            imageSrc={listing!.imageSrc}
            locationValue={listing!.locationValue}
            id={listing!.id}
            user={user}
          />
          <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
            <ListingInfo
              user={listing!.user}
              category={category}
              description={listing!.description}
              roomCount={listing!.roomCount}
              guestCount={listing!.guestCount}
              bathRoomCount={listing!.bathRoomCount}
              locationValue={listing!.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing!.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default ListingClient
