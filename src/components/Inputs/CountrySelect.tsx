'use client'

import useCountries from '@/hooks/useCountries'
import Select from 'react-select'

export type CountrySelecValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelecValue
  onChange: (value: CountrySelecValue) => void
}

const CountrySelect = ({ onChange }: CountrySelectProps) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        onChange={(value) => onChange(value as CountrySelecValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className='ml-1 text-neutral-500'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}
export default CountrySelect
