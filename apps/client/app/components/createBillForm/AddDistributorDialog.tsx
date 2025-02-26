import  { Dispatch, SetStateAction, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAuth } from '@clerk/remix';
import { TDomain } from '~/lib/types/db.types';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = billSchema.pick({ distributor_name: true,domain_id:true });

type TformValues = z.infer<typeof schema>;

export default function AddDistributorDialog({
  openDialog,
  setOpenDialog,
}: Props) {
  const queryClient = useQueryClient()
  const { userId } = useAuth()
  const { data  } = useQuery<any,any,TDomain[]>({
    queryKey:['domains'],
    queryFn: async() => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-all-domains`)).data;
    }
  })
  const { mutate, isPending } = useMutation<any, any, TformValues>({
    mutationKey: ['post-distributor'],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/distributor/post-distributor`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get_distributors'],
      });
      toast.success(`Distributor added`, { position: 'bottom-right' });
      setOpenDialog(false);
    },
  });
  const form = useForm<TformValues>({
    resolver: zodResolver(schema),
  });
  function onSubmit() {
    form.handleSubmit( (data) => {
      mutate(data)
    })()
  }

  return (
    <DialogModal
      title="Create distributor"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-10" >
        <Form {...form}>
          <FormField
            disabled={isPending}
            name="distributor_name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="domain_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((domain, index) => (
                      <SelectItem key={index} value={domain.id}>
                        {domain.name}
                      </SelectItem>
                    ))}
                   
                  </SelectContent>
                  <FormMessage />
                </Select>
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
