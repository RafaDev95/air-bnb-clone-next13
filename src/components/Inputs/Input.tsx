'use client'

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface Props {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<any>
  errors: FieldErrors
}

const Input = ({
  errors,
  id,
  label,
  register,
  disabled,
  formatPrice,
  type
}: Props) => {
  return (
    <div className='relative w-full'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='absolute left-2 top-5 text-neutral-700'
        />
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=''
        type={type}
        className={`no-arrows peer w-full rounded-md border-2 bg-white pt-6 font-light 
        outline-none transition disabled:cursor-not-allowed disabled:opacity-70
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black-300'}
        `}
      />
      <label
        className={`text-md absolute top-5 z-10 origin-[0] -translate-y-1 transform
          duration-150 
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-125 
          peer-focus:-translate-y-4
          peer-focus:scale-75 
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          ${formatPrice ? 'left-9' : 'left-4'}  
        `}
        htmlFor={id}
      >
        {label}
      </label>
      {errors[id] && (
        <p className='mt-1 text-sm font-light text-red-500'>
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  )
}
export default Input
