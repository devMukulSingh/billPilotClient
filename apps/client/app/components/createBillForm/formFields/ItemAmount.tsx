import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';

export default function ItemAmount({ form, index }: TForm) {
  return (
    <FormField
      name={`items.${index}.amount`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-[10%]">
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
