import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';

import { TForm } from '../bill/CreateBillForm';
import { Checkbox } from '~/components/ui/checkbox';

export default function IsPaid({ form }: Pick<TForm, 'form'>) {
  return (
    <FormField
      name="is_paid"
      control={form.control}
      defaultValue={false}
      render={({ field }) => (
        <FormItem className="flex items-end gap-2 border-black">
          <FormLabel>Is Paid</FormLabel>
          <FormControl>
            <Checkbox
              className="bg-white"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
