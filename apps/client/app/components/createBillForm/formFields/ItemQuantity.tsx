import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';

export default function ItemQuantity({ form, index }: TForm) {
  return (
    <FormField
      name={`items.${index}.quantity`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-[10%]">
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
