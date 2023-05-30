'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter = ({ title, subtitle, value, onChange }: Props) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value === 1) {
      return
    }

    onChange(value - 1)
  }, [onChange, value])
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-2'>
        <p className='font-medium '>{title}</p>
        <p className='font-light text-gray-600'>{subtitle}</p>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div
          onClick={onReduce}
          className='hover:-80 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition'
        >
          <AiOutlineMinus />
        </div>
        <p className='text-xl font-light text-neutral-600'>{value}</p>
        <div
          onClick={onAdd}
          className='hover:-80 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition'
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}
export default Counter
