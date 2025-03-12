import { Dispatch, SetStateAction } from 'react';
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
import ProductName from '../formFields/ProductName';
import ProductRate from '../formFields/ProductRate';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = z.object({
    name:z.string(),
    rate:z.coerce.number()
})

export type TProductFormValues = z.infer<typeof schema>;

export default function AddProductDialog({ openDialog, setOpenDialog }: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<any, any, TProductFormValues>({
    mutationKey: ['post_product'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/product`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({  queryKey: ["get_products"] });
      setOpenDialog(false);
      toast.success(`product added`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TProductFormValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit((data) => mutate(data))();
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
          <ProductName form={form} isPending={isPending} />
          <ProductRate form={form} isPending={isPending} />
        </Form>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </DialogModal>
  );
}
