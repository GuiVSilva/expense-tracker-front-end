import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { KeyRound, ArrowRight } from 'lucide-react'

export const CodeStep = ({
  email,
  code,
  setCode,
  codeError,
  setCodeError,
  isLoading,
  onSubmit,
  onResend,
  onBackToEmail
}) => {
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      const chars = value.replace(/\D/g, '').slice(0, 6).split('')
      const newCode = [...code]
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char
        }
      })
      setCode(newCode)
      setCodeError('')
      const nextIndex = Math.min(index + chars.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setCodeError('')

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const isCodeComplete = code.every(digit => digit !== '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(code.join(''))
  }

  return (
    <>
      <div className="text-center lg:text-left mb-8">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
          <KeyRound className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Digite o codigo
        </h2>
        <p className="text-muted-foreground">
          Insira o codigo de 6 digitos enviado para{' '}
          <span className="text-foreground font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">
            Codigo de verificacao
          </Label>
          <div className="flex items-center justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                className={`w-full aspect-square max-w-14 text-center text-2xl font-bold rounded-xl border-2 bg-card text-foreground outline-none transition-all duration-200
                  ${
                    digit
                      ? 'border-primary shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                      : 'border-border'
                  }
                  ${codeError ? 'border-destructive' : ''}
                  focus:border-primary focus:shadow-[0_0_12px_rgba(74,222,128,0.2)]`}
                aria-label={`Digito ${index + 1}`}
              />
            ))}
          </div>
          {codeError && (
            <p className="text-sm text-destructive text-center animate-in fade-in slide-in-from-top-1">
              {codeError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isCodeComplete || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Verificando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Verificar codigo
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Nao recebeu o codigo?
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={onResend}
              disabled={isLoading}
              className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors disabled:opacity-50"
            >
              Reenviar codigo
            </button>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={onBackToEmail}
              className="text-sm text-muted-foreground hover:text-foreground font-semibold transition-colors"
            >
              Alterar e-mail
            </button>
          </div>
        </div>
      </form>
    </>
  )
}