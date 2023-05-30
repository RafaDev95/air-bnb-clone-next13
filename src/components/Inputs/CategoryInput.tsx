'use client'

import { IconType } from 'react-icons'

type Props = {
  onClick: () => void
  selected: boolean
  label: string
  icon: IconType
}

const CategoryInput = ({ onClick, selected, label, icon: Icon }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`mr-2 flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4  transition hover:border-black active:scale-95
      ${selected ? 'border-black' : 'border-neutral-200'}
        `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  )
}
export default CategoryInput
