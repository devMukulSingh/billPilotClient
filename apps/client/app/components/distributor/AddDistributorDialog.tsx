import { Dispatch, SetStateAction, useEffect } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billSchema } from 'lib/schema';
import { z } from 'zod';
import { Form } from '../ui/form';
import { Plus, PlusCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import DistributorName from '../formFields/DistributorName';
import Domain from '../formFields/Domain';
import { Button } from '../ui/button';
import { usePostDistributorMutation } from 'services/distributor/distributorApiSlice';

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
  const { userId } = useAuth();
  const [trigger, { isLoading }] = usePostDistributorMutation();

  const form = useForm<TDistributorFormValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit(async (data) => {
      try {
        await trigger({
          ...data,
          userId,
        }).unwrap();
        toast.success(`Distributor added`, { position: 'bottom-right' });
        setOpenDialog(false);
      } catch (e) {
        console.log(e);
        toast.error(
          `Unable to create distributor, please contact the developer`
        );
      }
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
          <DistributorName form={form} isPending={isLoading} />
          <Domain form={form} isPending={isLoading} />
        </Form>
        <Button disabled={isLoading} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}

// const { mutate, isPending } = useMutation<any, any, TDistributorFormValues>({
//   mutationKey: ['post_distributor'],
//   mutationFn: async (data) => {
//     return await axios.post(`${BASE_URL_SERVER}/${userId}/distributor`, data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_distributors'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_distributors'] });
//     toast.success(`Distributor added`, { position: 'bottom-right' });
//     setOpenDialog(false);
//   },
// });
