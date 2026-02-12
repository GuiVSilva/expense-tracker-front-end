import { usersService } from '@/services/users'
import { useState } from 'react'
import { toast } from 'sonner'

export const useRecoverPassword = () => {
  const [step, setStep] = useState('email')
  const [isLoading, setIsLoading] = useState(false)
  const [fadeIn, setFadeIn] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [codeError, setCodeError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleStepChange = newStep => {
    setFadeIn(false)
    setTimeout(() => {
      setStep(newStep)
      setFadeIn(true)
    }, 300)
  }

  const handleSendCode = async email => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Informe um e-mail valido.')
      return
    }

    setIsLoading(true)
    setEmailError('')
    try {
      await usersService.sendCodeRecoveryPassword(email)
      handleStepChange('code')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao enviar o código. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async enteredCode => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))

    if (enteredCode !== '123456') {
      setCodeError('Codigo invalido. Tente novamente.')
      setIsLoading(false)
      return
    }

    handleStepChange('password')
    setIsLoading(false)
  }

  const handleResetPassword = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    handleStepChange('success')
    setIsLoading(false)
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    setCode(['', '', '', '', '', ''])
    setCodeError('')
    try {
      await usersService.sendCodeRecoveryPassword(email)
      toast.success('Código reenviado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao reenviar o código. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setFadeIn(false)
    setTimeout(() => {
      setStep('email')
      setCode(['', '', '', '', '', ''])
      setCodeError('')
      setFadeIn(true)
    }, 300)
  }

  const resetForm = () => {
    setEmail('')
    setEmailError('')
    setCode(['', '', '', '', '', ''])
    setCodeError('')
    setPassword('')
    setConfirmPassword('')
    setStep('email')
  }

  return {
    // State
    step,
    isLoading,
    fadeIn,
    email,
    emailError,
    code,
    codeError,
    password,
    confirmPassword,

    // Setters
    setEmail,
    setEmailError,
    setCode,
    setCodeError,
    setPassword,
    setConfirmPassword,
    setFadeIn,
    setStep,

    // Handlers
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    handleBackToEmail,
    resetForm
  }
}
