import React, { Dispatch, SetStateAction } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = z.object({
    name:z.string(),
    rate:z.coerce.number()
})

type TformValues = z.infer<typeof schema>;

export default function AddItemForm({ openDialog, setOpenDialog }: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<any, any, TformValues>({
    mutationKey: ['post-item'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/item/post-item`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_items'] });
      setOpenDialog(false);
      toast.success(`item added`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit((data) => mutate(data))();
  }
  return (
    <DialogModal
      dialogContentClassName='w-[25rem]'
      title="Create item"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-5">
        <Form {...form}>
          <FormField
            disabled={isPending}
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} onKeyUp={(e) => e.stopPropagation()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            name="rate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate ₹</FormLabel>
                <FormControl>
                  <Input {...field} onKeyUp={(e) => e.stopPropagation()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </DialogModal>
  );
}
