'use client'

import { User } from '@prisma/client'
import { Container, Logo } from '..'
import { Search, UserMenu, Categories } from '.'

type Props = {
  user?: User | null
}

const Navbar = ({ user }: Props) => {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='border-b-[1px] py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
export default Navbar
