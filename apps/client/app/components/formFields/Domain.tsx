import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DistributorFieldProps } from './formFields.types';

import { useQuery } from '@tanstack/react-query';
import { BASE_URL_SERVER } from 'lib/constants';
import { useAuth } from '@clerk/remix';
import { TApiResponse } from 'types/apiResponse.types';
import { TDomain } from 'types/api/domain';
import { useGetAllDomainsQuery } from 'services/domain/domainSlice';

export default function Domain({ form, isPending }: DistributorFieldProps) {
  const { userId } = useAuth();
  const { data } = useGetAllDomainsQuery({
    userId,
  });
  return (
    <FormField
      name="domain_id"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Domain</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger disabled={isPending} className="bg-white">
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
  );
}
