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
import { BASE_URL_SERVER } from 'lib/constants';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import { TProduct } from 'types/db.types';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  product: TProduct;
};

const schema = z.object({
  name: z.string(),
  rate: z.coerce.number(),
});

type TformValues = z.infer<typeof schema>;

export default function EditProductDialog({
  openDialog,
  setOpenDialog,
  product,
}: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<any, any, TformValues>({
    mutationKey: ['put_product'],
    mutationFn: async (data) => {
      return await axios.put(
        `${BASE_URL_SERVER}/${userId}/product/${product.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_products'] });
      queryClient.invalidateQueries({ queryKey: ['get_all_products'] });
      setOpenDialog(false);
      toast.success(`Product updated`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      rate: product.rate,
    },
  });
  function onSubmit() {
    form.handleSubmit((data) => mutate(data))();
  }
  return (
    <DialogModal
      dialogContentClassName="w-[25rem]"
      title="Edit Product"
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
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}
