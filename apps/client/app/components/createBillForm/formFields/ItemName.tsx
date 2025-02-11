import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';

export default function ItemName({ form, index }: TForm) {
  return (
    <FormField
      name={`items.${index}.name`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
