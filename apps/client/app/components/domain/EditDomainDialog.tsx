import React, { Dispatch, SetStateAction } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billSchema } from 'lib/schema';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import DomainName from '../formFields/DomainName';
import { TDomain } from 'types/api/domain';
import { usePutDomainMutation } from 'services/domain/domainSlice';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  domain: TDomain;
};

const schema = billSchema.pick({ domain_name: true });

type TformValues = z.infer<typeof schema>;

export default function EditDomainDialog({
  openDialog,
  setOpenDialog,
  domain,
}: Props) {
  const { userId } = useAuth();
  const [trigger, { isLoading }] = usePutDomainMutation();
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      domain_name: domain.name,
    },
  });
  async function onSubmit(e: any) {
    try {
      e.stopPropagation();
      await trigger({
        domain_name: form.getValues().domain_name,
        userId,
        id: domain.id,
      }).unwrap();
      setOpenDialog(false);
      toast.success(`Domain Updated`, { position: 'bottom-right' });
    } catch (e) {
      console.log(e);
      toast.error(`Unable to edit domain, please contact the developer`);
    }
  }
  return (
    <DialogModal
      title="Edit domain"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-10">
        <Form {...form}>
          <DomainName form={form} isPending={isLoading} />
        </Form>
        <Button disabled={isLoading} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}

// const { mutate, isPending } = useMutation<any, any, TformValues>({
//   mutationKey: ['put_domain'],
//   mutationFn: async (data) => {
//     return await axios.put(
//       `${BASE_URL_SERVER}/${userId}/domain/${domain.id}`,
//       data
//     );
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_domains'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_domains'] });
//     setOpenDialog(false);
//     toast.success(`Domain Updated`, { position: 'bottom-right' });
//   },
// });
