import { Dispatch, SetStateAction } from 'react';
import DialogModal from '../modals/DialogModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billSchema } from 'lib/schema';
import { z } from 'zod';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@clerk/remix';
import DomainName from '../formFields/DomainName';
import { usePostDomainMutation } from 'services/domain/domainSlice';
import toast from 'react-hot-toast';

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const schema = billSchema.pick({ domain_name: true });

export type TDomainFormValues = z.infer<typeof schema>;

export default function AddDomainDialog({ openDialog, setOpenDialog }: Props) {
  const { userId } = useAuth();
  const [trigger, { isLoading }] = usePostDomainMutation();
  const form = useForm<TDomainFormValues>({
    resolver: zodResolver(schema),
  });
  async function onSubmit(e: any) {
    try {
      e.stopPropagation();
      await trigger({
        domain_name: form.getValues().domain_name,
        userId,
      }).unwrap();
      setOpenDialog(false);
      toast.success(`Domain created`);
    } catch (e) {
      console.log(e);
      toast.error(`Unable to create domain, please contact the developer`);
    }
  }
  return (
    <DialogModal
      title="Create domain"
      open={openDialog}
      titleIcon={PlusCircle}
      onClose={() => setOpenDialog(false)}
    >
      <form className="space-y-10">
        <DomainName form={form} isPending={isLoading} />
        <Button disabled={isLoading} type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </DialogModal>
  );
}

// const { mutate, isPending } = useMutation<any, any, TDomainFormValues>({
//   mutationKey: ['post_domain'],
//   mutationFn: async (data) => {
//     return await axios.post(`${BASE_URL_SERVER}/${userId}/domain`, data);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_domains'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_domains'] });
//
//     toast.success(`Domain added`, { position: 'bottom-right' });
//   },
// });
