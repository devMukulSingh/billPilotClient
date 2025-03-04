import { UseFormReturn } from 'react-hook-form';
import { TDistributorFormValues } from '../distributor/AddDistributorDialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FieldsProps } from './formFields.types';

export default function DistributorName({ form, isPending }: FieldsProps) {
  return (
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
  );
}
