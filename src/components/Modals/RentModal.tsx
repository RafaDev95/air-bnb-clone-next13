'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const Map = dynamic(() => import('../Map'), {
  ssr: false
})
import { categories } from '../Navbar/mockData'
import { Heading } from '..'
import {
  CategoryInput,
  CountrySelect,
  Counter,
  ImageUpload,
  Input
} from '../Inputs'
import { Modal } from '.'
import useRentModal from '@/hooks/useRentModal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}
const LocationProps = z.object({
  flag: z.string(),
  label: z.string(),
  latlng: z.array(z.number()),
  region: z.string(),
  value: z.string()
})

const RentFormSchema = z.object({
  category: z.string(),
  location: LocationProps,
  guestCount: z.number().default(1),
  roomCount: z.number().default(1),
  bathRoomCount: z.number().default(1),
  imageSrc: z.string(),
  price: z.number().default(1),
  title: z.string().nonempty('Some Title is needed').min(5).max(20),
  description: z.string().nonempty('Some description is needed').min(10).max(80)
})

export type RentFormData = z.infer<typeof RentFormSchema>

const RentModal = () => {
  const { isOpen, onClose } = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<RentFormData>({
    resolver:
      step === STEPS.DESCRIPTION ? zodResolver(RentFormSchema) : undefined,
    defaultValues: {
      guestCount: 1,
      bathRoomCount: 1,
      roomCount: 1
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const bathRoomCount = watch('bathRoomCount')
  const roomCount = watch('roomCount')
  const imageSrc = watch('imageSrc')
  const price = watch('price')

  useEffect(() => {
    const isStepCategory = step === STEPS.CATEGORY
    const isStepLocation = step === STEPS.LOCATION
    const isStepImages = step === STEPS.IMAGES
    const isStepPrice = step === STEPS.PRICE

    const isCategorySelected = !!category
    const isLocationSelected = !!location
    const isImageSrcSelected = !!imageSrc
    const isPriceSelected = !!price

    const isDisabled =
      (isStepCategory && !isCategorySelected) ||
      (isStepLocation && !isLocationSelected) ||
      (isStepImages && !isImageSrcSelected) ||
      (isStepPrice && !isPriceSelected)

    setDisabled(isDisabled)
  }, [step, category, location, imageSrc, price])

  const setCustomValue = (id: keyof RentFormData, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const onNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const onSubmit = async (data: RentFormData) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    try {
      await axios.post('/api/listings', data)
      toast.success('Listings created.')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      onClose()
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }

    setIsLoading(false)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  const stepContent = [
    {
      step: STEPS.CATEGORY,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='Which of these best describes your place?'
            subtitle='Pick a category'
          />
          <div className='custom-scrollbar grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2'>
            {categories.map((categoryItem) => (
              <div key={categoryItem.label} className='col-span-1'>
                <CategoryInput
                  onClick={() => setCustomValue('category', categoryItem.label)}
                  label={categoryItem.label}
                  selected={category === categoryItem.label}
                  icon={categoryItem.icon}
                />
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      step: STEPS.LOCATION,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='Where is your place located?'
            subtitle='Help guests find you!'
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <div className='h-[35vh]'>
            <Map center={location?.latlng} />
          </div>
        </div>
      )
    },
    {
      step: STEPS.INFO,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='Share some basics about your place'
            subtitle='What amenities do you have?'
          />
          <Counter
            value={guestCount}
            title='Guests'
            subtitle='How many guests do you allow?'
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <hr />
          <Counter
            value={roomCount}
            title='Rooms'
            subtitle='How many rooms do you have?'
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <hr />
          <Counter
            value={bathRoomCount}
            title='Bathrooms'
            subtitle='How many bahtrooms do you have?'
            onChange={(value) => setCustomValue('bathRoomCount', value)}
          />
        </div>
      )
    },
    {
      step: STEPS.IMAGES,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='Add a photo of your place'
            subtitle='Show guests what your place looks like!'
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )
    },
    {
      step: STEPS.DESCRIPTION,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='How would you describe your place?'
            subtitle='Short and sweet works best'
          />
          <Input
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    },
    {
      step: STEPS.PRICE,
      content: (
        <div className='flexcol-wrapper-div'>
          <Heading
            title='Now set your price'
            subtitle='How much do you charge per night?'
          />
          <Input
            id='price'
            label='Price'
            formatPrice
            type='number'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      disabled={disabled}
      title='Airbnb your home'
    />
  )
}
export default RentModal
