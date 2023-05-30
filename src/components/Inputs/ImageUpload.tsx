'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  // eslint-disable-next-line no-var
  var cloudinary: any
}

type Props = {
  onChange: (value: string) => void
  value: string
}

const ImageUpload = ({ onChange, value }: Props) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`relative flex cursor-pointer flex-col items-center 
              justify-center gap-4 ${
                !value && 'border-2 border-dashed border-neutral-300'
              }
               p-20 text-neutral-600 transition hover:opacity-70`}
          >
            {value ? (
              <div className='absolute inset-0 h-full w-full'>
                <Image
                  alt='Upload for images'
                  fill
                  className='object-contain'
                  src={value}
                  title='Upload'
                />
              </div>
            ) : (
              <TbPhotoPlus size={50} />
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
export default ImageUpload
