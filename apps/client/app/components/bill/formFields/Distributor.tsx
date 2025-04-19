import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { TForm } from '../CreateBillForm';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddDistributorForm from '../../distributor/AddDistributorDialog';
import { useAuth } from '@clerk/remix';

import { useGetAllDistributorsQuery } from 'services/distributor/distributorApiSlice';

export default function DistributorName({ form }: Pick<TForm, 'form'>) {
  const { userId } = useAuth();
  const { data } = useGetAllDistributorsQuery({
    userId,
  });
  // const { data } = useQuery<any, any, TDistributor[]>({
  //   queryKey: ['get_all_distributors'],
  //   queryFn: async () => {
  //     return (
  //       await axios.get(
  //         `${BASE_URL_SERVER}/${userId}/distributor/get-all-distributors`
  //       )
  //     ).data;
  //   },
  // });

  const [openDialog, setOpenDialog] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  return (
    <>
      {openDialog && (
        <AddDistributorForm
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      <FormField
        name="distributor_id"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Distributor </FormLabel>
            <Select
              key={field.value}
              defaultValue={field.value}
              onOpenChange={() => openSelect && setOpenSelect(false)}
              open={openSelect}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger
                  onClick={() => setOpenSelect((prev) => !prev)}
                  className="bg-white"
                >
                  <SelectValue placeholder="Select distributor" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {data?.map((dist, index) => (
                  <SelectItem key={index} value={dist.id}>
                    {dist.name}
                  </SelectItem>
                ))}
                <Button
                  onClick={() => {
                    setOpenDialog(true);
                    setOpenSelect(false);
                  }}
                  variant={'outline'}
                  className="flex items-center gap-2 w-full"
                >
                  <Plus />
                  Add Distributor
                </Button>
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />
    </>
  );
}
