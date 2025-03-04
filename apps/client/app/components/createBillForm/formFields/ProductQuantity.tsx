import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';

export default function ProductQuantity({ form, index }: TForm) {
 
  return (
    <FormField
      name={`bill_items.${index}.quantity`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-20">
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <Input className="bg-white" 
            value={field.value}
            onChange={ (e) => {
              field.onChange(e.target.value);
              form.setValue(
                `bill_items.${index}.amount`,
                form.getValues().bill_items[index].product.rate *
                  Number(e.target.value)
              );
            }} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
