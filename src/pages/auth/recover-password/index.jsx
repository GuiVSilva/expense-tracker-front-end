import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { Wallet, ArrowLeft } from 'lucide-react'

import { useRecoverPassword } from './hooks/useRecoverPassword'
import { BrandingSection } from './components/BrandingSection'
import { EmailStep } from './components/EmailStep'
import { CodeStep } from './components/CodeStep'
import { PasswordStep } from './components/PasswordStep'
import { SuccessStep } from './components/SuccessStep'

export const RecoverPassword = () => {
  const navigate = useNavigate()
  const {
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

    // Handlers
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    handleBackToEmail
  } = useRecoverPassword()

  return (
    <div className="min-h-screen bg-background flex">
      <BrandingSection step={step} />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div
          className={`w-full max-w-md transition-all duration-300 ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-3 mb-8 lg:hidden justify-center"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ExpenseTracker
            </span>
          </Link>

          {step === 'email' && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              isLoading={isLoading}
              onSubmit={handleSendCode}
            />
          )}

          {step === 'code' && (
            <CodeStep
              email={email}
              code={code}
              setCode={setCode}
              codeError={codeError}
              setCodeError={setCodeError}
              isLoading={isLoading}
              onSubmit={handleVerifyCode}
              onResend={handleResendCode}
              onBackToEmail={handleBackToEmail}
            />
          )}

          {step === 'password' && (
            <PasswordStep
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isLoading={isLoading}
              onSubmit={handleResetPassword}
            />
          )}

          {step === 'success' && <SuccessStep onNavigate={navigate} />}

          {step !== 'success' && (
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
