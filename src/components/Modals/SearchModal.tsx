'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { formatISO } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../Map'), { ssr: false })
import useSearchModal from '@/hooks/useSearchModal'
import CountrySelect, { CountrySelecValue } from '../Inputs/CountrySelect'
import { Modal } from '.'
import { Calendar, Counter } from '../Inputs'
import Heading from '../Heading'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { isOpen, onClose } = useSearchModal()

  const [location, setLocation] = useState<CountrySelecValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathRoomCount, setBathRoomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let query = {}

    if (params) {
      query = queryString.parse(params.toString())
    }

    const updatedQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    onClose()
    router.push(url)
  }, [
    step,
    location,
    router,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    onNext,
    params
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  const stepContent = [
    {
      step: STEPS.LOCATION,
      content: (
        <div className='flex flex-col gap-8'>
          <Heading
            title='Where do you wanna go?'
            subtitle='Find the perfect location!'
          />
          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelecValue)}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      )
    },
    {
      step: STEPS.DATE,
      content: (
        <div className='flex flex-col gap-8'>
          <Heading
            title='When do you plan to go?'
            subtitle='Make sure everyone is free!'
          />
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      )
    },
    {
      step: STEPS.INFO,
      content: (
        <div className='flex flex-col gap-8'>
          <Heading
            title='More information'
            subtitle='Find your perfect place!'
          />
          <Counter
            onChange={(value) => setGuestCount(value)}
            value={guestCount}
            title='Guests'
            subtitle='How many guests are coming?'
          />
          <hr />
          <Counter
            onChange={(value) => setRoomCount(value)}
            value={roomCount}
            title='Rooms'
            subtitle='How many rooms do you need?'
          />
          <hr />
          <Counter
            onChange={(value) => {
              setBathRoomCount(value)
            }}
            value={bathRoomCount}
            title='Bathrooms'
            subtitle='How many bahtrooms do you need?'
          />
        </div>
      )
    }
  ]

  const bodyContent =
    stepContent.find((stepItem) => stepItem.step === step)?.content || null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  )
}
export default SearchModal
