'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'

import { useCallback, memo } from 'react'
import { IconType } from 'react-icons'

type Props = {
  label: string
  selected?: boolean
  icon: IconType
}

const CategoryItem = ({ label, selected, icon: Icon }: Props) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition
       hover:border-b-neutral-200 hover:text-neutral-800 active:scale-90
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
     
    `}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}
export default memo(CategoryItem)
