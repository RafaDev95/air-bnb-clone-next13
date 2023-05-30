'use client'

import Container from './Container'
import Heading from './Heading'

type Props = {
  children: React.ReactNode
  title: string
  subtitle: string
}

const ListingsGridContainer = ({ children, title, subtitle }: Props) => {
  return (
    <Container>
      <Heading title={title} subtitle={subtitle} />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {children}
      </div>
    </Container>
  )
}
export default ListingsGridContainer
