import { Dispatch, SetStateAction, useEffect } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billSchema } from '~/lib/schema';
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
import { Plus, PlusCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAuth } from '@clerk/remix';
import { TDomain } from '~/lib/types/db.types';
import DistributorName from '../formFields/DistributorName';
import Domain from '../formFields/Domain';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = billSchema.pick({ distributor_name: true, domain_id: true });

export type TDistributorFormValues = z.infer<typeof schema>;

export default function AddDistributorDialog({
  openDialog,
  setOpenDialog,
}: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation<any, any, TDistributorFormValues>({
    mutationKey: ['post_distributor'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/distributor`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get_distributors','get_all_distributors'],
      });
      toast.success(`Distributor added`, { position: 'bottom-right' });
      setOpenDialog(false);
    },
  });
  const form = useForm<TDistributorFormValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit((data) => {
      mutate(data);
    })();
  }

  return (
    <DialogModal
      title="Create distributor"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-10">
        <Form {...form}>
          <DistributorName
            form={form}
            isPending={isPending}
          />
          <Domain form={form} isPending={isPending} />
        </Form>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}
