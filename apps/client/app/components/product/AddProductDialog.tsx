import { Dispatch, SetStateAction } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import ProductName from '../formFields/ProductName';
import ProductRate from '../formFields/ProductRate';
import { usePostProductMutation } from 'services/product/productApiSlice';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = z.object({
  name: z.string(),
  rate: z.coerce.number(),
});

export type TProductFormValues = z.infer<typeof schema>;

export default function AddProductDialog({ openDialog, setOpenDialog }: Props) {
  const { userId } = useAuth();
  const [trigger, { isLoading }] = usePostProductMutation();
  const form = useForm<TProductFormValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit(async (data) => {
      try {
        await trigger({
          ...data,
          userId,
        }).unwrap();
        setOpenDialog(false);
        toast.success(`product added`, { position: 'bottom-right' });
      } catch (e: any) {
        console.log(e);
        if (e.data) toast.error(e.data.error);
        else
          toast.error(`Unable to create product, please contact the developer`);
      }
    })();
  }
  return (
    <DialogModal
      dialogContentClassName="w-[25rem]"
      title="Create product"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-5">
        <Form {...form}>
          <ProductName form={form} isPending={isLoading} />
          <ProductRate form={form} isPending={isLoading} />
        </Form>
        <Button disabled={isLoading} type="button" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </DialogModal>
  );
}

// const { mutate, isPending } = useMutation<any, any, TProductFormValues>({
//   mutationKey: ['post_product'],
//   mutationFn: async (data) => {
//     return await axios.post(`${BASE_URL_SERVER}/${userId}/product`, data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_products'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_products'] });
//     setOpenDialog(false);
//     toast.success(`product added`, { position: 'bottom-right' });
//   },
// });
