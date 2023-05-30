import './globals.css'

import { Toaster } from 'react-hot-toast'
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'] })

import { Navbar } from '../components/Navbar'
import {
  LoginModal,
  RegisterModal,
  RentModal,
  SearchModal
} from '../components/Modals'
import getUser from './actions/getUser'

export const metadata = {
  title: 'RD95 AirBnb',
  description: 'RD95'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/icon.svg' />
      </head>
      <body className={font.className}>
        <Toaster />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar user={user} />
        <main className='pb-20 pt-44'>{children}</main>
      </body>
    </html>
  )
}
