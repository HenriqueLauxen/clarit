import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

// shortcut: código e sessão simulados no cliente até integrar a autenticação real.
const mockCode = '123456'

type OtpFormProps = {
  email: string
  onChangeEmail: () => void
  onVerified: () => void
}

export default function OtpForm({ email, onChangeEmail, onVerified }: OtpFormProps) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'wrong' | 'verified' | 'leaving'>('idle')
  const [focused, setFocused] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (status === 'idle') return

    const timer = window.setTimeout(() => {
      if (status === 'checking') {
        setStatus(code === mockCode ? 'verified' : 'wrong')
      } else if (status === 'wrong') {
        setCode('')
        setStatus('idle')
      } else if (status === 'verified') {
        setStatus('leaving')
      } else {
        onVerified()
      }
    }, { checking: 1350, wrong: 900, verified: 550, leaving: 240 }[status])

    return () => window.clearTimeout(timer)
  }, [code, status, onVerified])

  return (
    <div className="grid justify-items-center gap-2">
      <div className="flex w-full items-center justify-center gap-2 text-sm">
        <span className="min-w-0 wrap-anywhere font-medium">{email}</span>
        <button type="button" onClick={onChangeEmail} className="shrink-0 rounded px-1 py-2 text-xs font-medium text-blue-700 hover:underline">
          Trocar
        </button>
      </div>

      <div aria-live="polite" className="empty:absolute">
        <AnimatePresence initial={false} mode="wait">
          {status !== 'idle' && status !== 'leaving' && (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
              exit={status === 'checking' ? { opacity: 0 } : {
                letterSpacing: '-0.5em',
                opacity: [1, 0.65, 0],
                transition: {
                  duration: 0.2,
                  ease: 'easeIn',
                  opacity: { duration: 0.2, times: [0, 0.5, 1] },
                },
              }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 text-xs"
            >
              {status === 'checking' && <><LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> Verificando</>}
              {status === 'wrong' && <><CircleAlert aria-hidden="true" className="size-3.5 text-destructive" /> Código incorreto</>}
              {status === 'verified' && <><CircleCheck aria-hidden="true" className="size-4 text-[#3D8064]" /> Código verificado</>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status !== 'verified' && status !== 'leaving' && (
        <div className="relative">
          <div
            aria-hidden="true"
            data-wrong={status === 'wrong'}
            className="flex data-[wrong=true]:animate-[otp-shake_320ms_ease-in-out]"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <motion.span
                key={index}
                animate={{
                  x: status === 'checking' || status === 'wrong' ? (index - 2.5) * 3 : 0,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
                data-checking={status === 'checking'}
                style={{ animationDelay: `${index * 75}ms` }}
                className="relative grid h-11 w-9 place-items-center border bg-card font-mono text-lg first:rounded-l-md last:rounded-r-md [&+&]:-ml-px data-[checking=true]:animate-[otp-wave_800ms_ease-in-out_infinite] sm:h-12 sm:w-10"
              >
                {code[index]}
                {focused && status === 'idle' && index === code.length && (
                  <span className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
                    <span className="h-4 w-px bg-foreground" />
                  </span>
                )}
              </motion.span>
            ))}
          </div>
          <input
            aria-label="Código de verificação de seis dígitos"
            aria-invalid={status === 'wrong'}
            aria-describedby="otp-hint"
            autoComplete="one-time-code"
            inputMode="numeric"
            autoFocus
            value={code}
            readOnly={status !== 'idle'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(event) => {
              const digits = event.target.value.replace(/[^0-9]/g, '').slice(0, 6)
              setCode(digits)
              if (digits.length === 6) setStatus('checking')
            }}
            className="absolute inset-0 z-20 size-full cursor-text opacity-0"
          />
        </div>
      )}
      <p id="otp-hint" className="text-xs text-muted-foreground">Código de teste: {mockCode}</p>
    </div>
  )
}
