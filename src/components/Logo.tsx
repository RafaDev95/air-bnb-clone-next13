'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      className='hidden h-[100px] w-[100px] cursor-pointer object-contain md:block'
      alt='Logo'
      src='/images/logo.png'
      height={100}
      width={100}
      priority
      onClick={() => router.push('/')}
    />
  )
}
export default Logo
