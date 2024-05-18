import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const signInFormSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
})

type signInFormType = z.infer<typeof signInFormSchema>

export function SignInPage() {
  const form = useForm<signInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const { handleSubmit, formState } = form

  async function handleSignIn(data: signInFormType) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <>
      <Helmet title="Entrar" />
      <main className="flex w-full justify-center">
        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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
                Acessar painel
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
