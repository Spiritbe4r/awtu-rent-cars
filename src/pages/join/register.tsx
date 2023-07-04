

import { RegisterForm } from '@/components/Auth/RegisterForm/RegisterForm'
import { JoinLayout } from '@/layouts'

import React from 'react'

const register = () => {
  return (
    <JoinLayout>
              <RegisterForm />
        </JoinLayout>
  )
}

export default register