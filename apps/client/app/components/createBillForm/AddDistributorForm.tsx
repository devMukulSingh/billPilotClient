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

const schema = createBillSchema.pick({ distributorName: true });

type TformValues = z.infer<typeof schema>;

export default function AddDistributorForm({
  openDialog,
  setOpenDialog,
}: Props) {
  const { mutate, isPending } = useMutation<any, any, TformValues>({
    mutationKey: ['post-distributor'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/distributor/post-distributor`,
        data
      );
    },
    onSuccess: () => {
      setOpenDialog(false);
      toast.success(`Distributor added`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    const formData = form.getValues();
    mutate(formData);
  }
  return (
    <DialogModal
      title="Create distributor"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            disabled={isPending}
            name="distributorName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
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
