import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ProductFieldProps } from './formFields.types';

type Props = {};

export default function ProductRate({ form, isPending }: ProductFieldProps) {
  return (
    <FormField
      disabled={isPending}
      name="rate"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rate ₹</FormLabel>
          <FormControl>
            <Input {...field} onKeyUp={(e) => e.stopPropagation()} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
