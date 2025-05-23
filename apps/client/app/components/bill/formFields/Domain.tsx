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
import AddDomainForm from '../../domain/AddDomainDialog';
import { useAuth } from '@clerk/remix';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL_SERVER } from 'lib/constants';
import axios from 'axios';
import { TApiResponse } from 'types/apiResponse.types';
import { TDomain } from 'types/api/domain';
import { useGetAllDomainsQuery } from 'services/domain/domainSlice';

export default function Domain({ form }: Pick<TForm, 'form'>) {
  const { userId } = useAuth();
  const { data } = useGetAllDomainsQuery({
    userId,
  });

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <AddDomainForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <FormField
        name="domain_id"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Domain</FormLabel>
            <Select
              key={field.value}
              defaultValue={field.value}
              onValueChange={(val) => field.onChange(val)}
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
                <Button
                  onClick={() => setOpenDialog(true)}
                  variant={'outline'}
                  className="flex items-center gap-2 w-full"
                >
                  <Plus />
                  Add Domain
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

// const { data } = useQuery<any, any, TApiResponse<TDomain[]>>({
//   queryKey: ['get_all_domains'],
//   queryFn: async () => {
//     return (
//       await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-all-domains`)
//     ).data;
//   },
// });
// console.log(data);
