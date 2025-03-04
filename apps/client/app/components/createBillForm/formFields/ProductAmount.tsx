import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';

export default function ProductAmount({ form, index }: TForm) {

  return (
    <FormField
      name={`bill_items.${index}.amount`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-20">
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input disabled className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
