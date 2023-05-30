'use client'

import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useRegisterModal, useLoginModal, useRentModal } from '@/hooks'
import { optionsForUser, optionsForNonUser } from './mockData'

type Props = {
  user?: User | null
}

const UserMenu = ({ user }: Props) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  const onRent = useCallback(() => {
    if (!user) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [rentModal, loginModal, registerModal])

  const redirect = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  const userOptionsFunctions = {
    'My trips': () => redirect('/trips'),
    'My favorites': () => redirect('/favorites'),
    'My reservations': () => redirect('/reservations'),
    'My properties': () => redirect('/properties'),
    'Airbnb my home': onRent,
    Logout: () => signOut()
  }

  const getFunctionsByLabel = (label: string) => {
    return userOptionsFunctions[label as keyof typeof userOptionsFunctions]
  }

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden cursor-pointer rounded-full px-4 py-4 font-semibold transition hover:bg-neutral-100 md:block'
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px]
         border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-14 z-20 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {user ? (
              <>
                {optionsForUser.map((label) => (
                  <MenuItem
                    key={label}
                    label={label}
                    onClick={getFunctionsByLabel(label)}
                  />
                ))}
              </>
            ) : (
              <>
                {optionsForNonUser.map((label) => (
                  <MenuItem
                    key={label}
                    label={label}
                    onClick={
                      label === 'Login'
                        ? loginModal.onOpen
                        : registerModal.onOpen
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default UserMenu
