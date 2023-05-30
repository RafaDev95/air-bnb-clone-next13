'use client'
import axios from 'axios'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from './Modal'
import { Heading, Button } from '..'
import { Input } from '../Inputs'
import useLoginModal from '@/hooks/useLoginModal'

const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(4, 'Your name must have at least 4 characters')
    .nonempty('Required field.'),
  email: z.string().email('Wrong email format.').nonempty('Required field.'),
  password: z
    .string()
    .nonempty('Required field.')
    .min(6, 'Your password must have at least 6 characters')
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

const RegisterModal = () => {
  const { isOpen, onClose } = useRegisterModal()
  const { onOpen: loginModalOnOpen } = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      await axios.post('/api/register', data)
      toast.success('Succefully registered!')
      onClose()
      loginModalOnOpen()
    } catch (error: any) {
      toast.error('Something went worng')
    }
    setIsLoading(false)
  }

  const loginHandler = () => {
    onClose()
    loginModalOnOpen()
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create and account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
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
          <div>Already have an account?</div>
          <button
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={loginHandler}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title='Register'
      actionLabel='Cotinue'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
export default RegisterModal
