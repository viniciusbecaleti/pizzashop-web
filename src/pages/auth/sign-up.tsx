import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpFormInputs = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormInputs>()

  async function handleSignUp(data: SignUpFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)

    toast.success(`Restaurante cadastrado com sucesso!`)

    navigate('/sign-in')
  }

  return (
    <>
      <Helmet title="Registrar" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in" className="">
            Fazer login
          </Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>

          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>

            <div>
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div>
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <Link to="/" className="underline underline-offset-4">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="/" className="underline underline-offset-4">
                Política de Privacidade
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
