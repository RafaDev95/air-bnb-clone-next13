'use client'

interface Props {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20 ${
        className && className
      }`}
    >
      {children}
    </div>
  )
}

export default Container
