import { CircleAlert } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import logo from '@/assets/sol-pixelado.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const credentials = z.object({ email: z.string().trim().min(1, 'Informe seu e-mail.').pipe(z.email('Informe um e-mail válido.')) })

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(credentials),
  })
  const reducedMotion = useReducedMotion()

  return (
    <div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col px-6 pt-6 pb-8 select-none [&_input]:select-text sm:px-10 2xl:px-0">
      <header className="flex items-center gap-1.5">
        <img src={logo} alt="" className="size-[30px]" />
        <span className="font-serif text-2xl leading-none tracking-tight">Clarity</span>
      </header>

      <main className="grid flex-1 items-center gap-10 pt-8 lg:grid-cols-[1fr_minmax(0,43%)] lg:pr-12">
        <motion.section
          aria-labelledby="entry-title"
          className="mx-auto w-full text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-8 max-w-2xl">
            <h1 id="entry-title" className="font-serif text-[clamp(2.5rem,4vw,3.75rem)] leading-none tracking-tight text-balance">
              Veja onde seu dinheiro vai
            </h1>
            <p className="mt-4 font-serif text-xl">Suas finanças em um só lugar, com mais clareza.</p>
          </div>

          <div className="mx-auto grid max-w-md gap-3 rounded-[2rem] border bg-card p-5 sm:p-7">
            <Button type="button" variant="outline" className="h-10 rounded-[10px] bg-card shadow-none">
              <svg aria-hidden="true" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z" />
                <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.7l-6.6-5a12.3 12.3 0 0 1-18.3-6.5H5.8v5.2A20 20 0 0 0 24 44Z" />
                <path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18Z" />
                <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.2A12 12 0 0 1 24 11.9Z" />
              </svg>
              Continuar com o Google
            </Button>
            <Button type="button" variant="outline" className="h-10 rounded-[10px] bg-card shadow-none">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.1 12.3c0-2 1.6-3 1.7-3.1a3.7 3.7 0 0 0-3-1.6c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.8a4 4 0 0 0-3.4 2.1c-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.7-1-2.7-3.4ZM15 6.2a3.8 3.8 0 0 0 .9-2.7 4 4 0 0 0-2.5 1.3 3.6 3.6 0 0 0-.9 2.6A3.3 3.3 0 0 0 15 6.2Z" />
              </svg>
              Continuar com Apple
            </Button>
            <p className="text-xs text-muted-foreground">OU</p>

            <form
              className="grid gap-3"
              noValidate
              onSubmit={handleSubmit(() => {})}
            >
              <div className="grid gap-2">
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-label="E-mail"
                  placeholder="Digite seu e-mail"
                  className="h-10 rounded-[10px] bg-card px-4 shadow-none"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="flex items-center gap-1.5 text-left text-sm text-destructive-foreground">
                    <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="h-10 rounded-[10px]">Continuar com e-mail</Button>
            </form>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" onClick={(event) => event.preventDefault()} className="text-blue-700 hover:underline">Termos de Uso</a>.
              Saiba como tratamos seus dados na{' '}
              <a href="#" onClick={(event) => event.preventDefault()} className="text-blue-700 hover:underline">Política de Privacidade</a>.
            </p>
          </div>
        </motion.section>

        <div className="hidden aspect-[4/5] w-full max-w-[calc((100dvh-8rem)*4/5)] justify-self-center overflow-hidden rounded-2xl bg-accent lg:block">
          <video
            aria-hidden="true"
            className="size-full object-cover"
            poster="https://images.pexels.com/videos/5466768/accounting-money-tax-taxes-5466768.jpeg?auto=compress&h=750&w=1260"
            src="https://videos.pexels.com/video-files/5466768/5466768-hd_1920_1080_25fps.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </main>
    </div>
  )
}
