'use client'

import { EmptyState } from '@/components'
import { useEffect } from 'react'

type Props = {
  error: Error
}

const ErrorState = ({ error }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <EmptyState
      title='Er...'
      subtitle='Something went wrong. Please back to the main page.'
    />
  )
}

export default ErrorState
