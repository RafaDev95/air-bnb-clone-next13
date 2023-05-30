/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { motion } from 'framer-motion'
import React, { useRef, useMemo } from 'react'

import { TbChevronRight, TbChevronLeft } from 'react-icons/tb'

import { Container, CategoryItem } from '..'
import { useSearchParams, usePathname } from 'next/navigation'
import { categories } from './mockData'

const Categories = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const category = searchParams?.get('category')

  const isMainPage = useMemo(() => pathname === '/', [pathname])

  const sliderRef = useRef<HTMLDivElement>(null)

  const slideWidth = useMemo(
    () =>
      sliderRef.current
        ? sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
        : 0,
    []
  )

  const handleLefNavButton = (e: React.FormEvent) => {
    e.preventDefault()
    sliderRef.current!.scrollLeft -= sliderRef.current!.offsetWidth
  }

  const handleNextNavButton = (e: React.FormEvent) => {
    e.preventDefault()
    sliderRef.current!.scrollLeft += sliderRef.current!.offsetWidth
  }

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className='relative px-5'>
        <button
          className='categories-nav-button -left-3 hover:shadow-lg'
          onClick={handleLefNavButton}
        >
          <TbChevronLeft size={20} />
        </button>
        <motion.div
          className='overflow-hidden scroll-smooth py-4'
          ref={sliderRef}
        >
          <motion.div
            className='flex items-center justify-between'
            drag='x'
            dragConstraints={{ right: 0, left: -slideWidth }}
          >
            {categories.map((categoryItem) => (
              <CategoryItem
                key={categoryItem.label}
                label={categoryItem.label}
                icon={categoryItem.icon}
                selected={category === categoryItem.label}
              />
            ))}
          </motion.div>
        </motion.div>
        <button
          className='categories-nav-button -right-3 hover:shadow-lg'
          onClick={handleNextNavButton}
        >
          <TbChevronRight size={20} />
        </button>
      </div>
    </Container>
  )
}
export default Categories
