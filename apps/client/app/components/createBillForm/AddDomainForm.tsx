import React, { Dispatch, SetStateAction } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBillSchema } from '~/lib/schema';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import toast from 'react-hot-toast';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = createBillSchema.pick({ domain: true });

type TformValues = z.infer<typeof schema>;

export default function AddDomainForm({
  openDialog,
  setOpenDialog,
}: Props) {
  const { mutate, isPending } = useMutation<any, any, TformValues>({
    mutationKey: ['post-domain'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/domain/post-domain`,
        data
      );
    },
    onSuccess: () => {
      setOpenDialog(false);
      toast.success(`Domain added`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit(e:any) {
    console.log(e);
    e.stopPropagation()
    const formData = form.getValues();
    mutate(formData);
  }
  return (
    <DialogModal
      title="Create domain"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form 
      className="space-y-10" 
    //   onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <FormField
            disabled={isPending}
            name="domain"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} onKeyUp={(e) => e.stopPropagation()}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}
