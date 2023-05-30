'use client'

import { useRouter } from 'next/navigation'
import { Heading, Button } from '@/components'

type Props = {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try to changing or removing some of your filters',
  showReset
}: Props) => {
  const router = useRouter()
  return (
    <div className='flex h-[60vh] flex-col items-center justify-center gap-2'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='mt-4 w-48'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}
export default EmptyState
