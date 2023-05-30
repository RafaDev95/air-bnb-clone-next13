/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/libs/prismadb'

export const getSession = async () => {
  return await getServerSession(authOptions)
}

const getUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!user) {
      return null
    }

    return user
  } catch (error: any) {
    return null
  }
}

export default getUser
