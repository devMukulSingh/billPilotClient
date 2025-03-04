import React, { Dispatch, SetStateAction } from 'react';
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
import DomainName from '../formFields/DomainName';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = billSchema.pick({ domain_name: true });

export type TDomainFormValues = z.infer<typeof schema>;

export default function AddDomainDialog({
  openDialog,
  setOpenDialog,
}: Props) {
  const queryClient = useQueryClient()
  const { userId } = useAuth()
  const { mutate, isPending } = useMutation<any, any, TDomainFormValues>({
    mutationKey: ['post_domain'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/domain/post-domain`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['get_domains']})
      setOpenDialog(false);
      toast.success(`Domain added`, { position: 'bottom-right' });
    },
  });
  const form = useForm<TDomainFormValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit(e:any) {
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
        <DomainName form={form} isPending={isPending}/>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}
