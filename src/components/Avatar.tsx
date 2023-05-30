'use client'
import Image from 'next/image'

type Props = {
  src?: string | null | undefined
}

const Avatar = ({ src }: Props) => {
  return (
    <Image
      className='rounded-full'
      height='30'
      width='30'
      alt='Avatar'
      src={src ? src : '/images/placeholder.jpg'}
      priority
    />
  )
}
export default Avatar
