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
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import { usePutProductMutation } from 'services/product/productApiSlice';
import { TProduct } from 'types/api/product';

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
  const { userId } = useAuth();
  const [trigger, { isLoading }] = usePutProductMutation();

  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      rate: product.rate,
    },
  });
  function onSubmit() {
    form.handleSubmit(async (data) => {
      try {
        await trigger({
          ...data,
          userId,
          id: product.id,
        }).unwrap();
        setOpenDialog(false);
        toast.success(`Product updated`, { position: 'bottom-right' });
      } catch (e: any) {
        console.log(e);
        if (e?.data) toast.error(e.data.error);
        else
          toast.error('Unable to edit Product, please contact the developer');
      }
    })();
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
            disabled={isLoading}
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
            disabled={isLoading}
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
        <Button disabled={isLoading} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}

// const { mutate, isLoading } = useMutation<any, any, TformValues>({
//   mutationKey: ['put_product'],
//   mutationFn: async (data) => {
//     return await axios.put(
//       `${BASE_URL_SERVER}/${userId}/product/${product.id}`,
//       data
//     );
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_products'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_products'] });
// setOpenDialog(false);
// toast.success(`Product updated`, { position: 'bottom-right' });
//   },
// });
