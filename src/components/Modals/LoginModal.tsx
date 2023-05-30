'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'

import Modal from './Modal'
import { Heading, Button } from '..'
import { Input } from '../Inputs'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

const LoginFormSchema = z.object({
  email: z.string().nonempty('Required field.').email('Wrong email format.'),
  password: z.string().nonempty('Required field.')
})

type LoginFormData = z.infer<typeof LoginFormSchema>

const LoginModal = () => {
  const router = useRouter()
  const { isOpen, onClose } = useLoginModal()
  const { onOpen: registerModalonOpen } = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema)
  })

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const createAccountHandler = () => {
    onClose()
    registerModalonOpen()
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to you account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
        type='email'
      />

      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex items-center justify-center gap-2'>
          <div>First time using Airbnb?</div>
          <button
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={createAccountHandler}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Login'
      actionLabel='Cotinue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
export default LoginModal
