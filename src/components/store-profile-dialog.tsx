import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const updateStoreProfileFormSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  description: z.string().min(3, 'Descrição muito curta'),
})

type updateStoreProfileFormType = z.infer<typeof updateStoreProfileFormSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  })

  const form = useForm<updateStoreProfileFormType>({
    resolver: zodResolver(updateStoreProfileFormSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const { handleSubmit, formState } = form

  async function handleUpdateStoreProfile(data: updateStoreProfileFormType) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Falha ao atualizar perfil, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>

        <Form {...form}>
          <form
            id="update-profile-form"
            onSubmit={handleSubmit(handleUpdateStoreProfile)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Nome</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Descrição</FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            form="update-profile-form"
            type="submit"
            variant="success"
            disabled={formState.isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  )
}
