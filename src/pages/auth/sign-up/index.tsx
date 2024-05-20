import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, {
    message: 'Nome do estabelecimento é obrigatório',
  }),
  managerName: z.string().min(1, {
    message: 'Nome do proprietário é obrigatório',
  }),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'Telefone inválido',
  }),
  email: z.string().email({
    message: 'E-mail inválido',
  }),
})

type signUpFormType = z.infer<typeof signUpFormSchema>

export function SignUpPage() {
  const navigate = useNavigate()

  const form = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      restaurantName: '',
      managerName: '',
      phone: '',
      email: '',
    },
  })

  const { handleSubmit, formState } = form

  const phoneInputRef = useMask({
    mask: '(__) _____-____',
    replacement: { _: /\d/ },
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: signUpFormType) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Acessar painel',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Ocorreu um erro durante a criação do restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <main className="flex w-full justify-center">
        <Button asChild variant="ghost" className="absolute right-10 top-10">
          <Link to="/sign-in">Acessar painel</Link>
        </Button>

        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome do estabelecimento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="managerName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome do proprietário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} ref={phoneInputRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Seu e-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={formState.isSubmitting}
              >
                Finalizar cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="underline">
                  Termos de serviço
                </a>{' '}
                e{' '}
                <a href="#" className="underline">
                  política de privacidade
                </a>
                .
              </p>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
