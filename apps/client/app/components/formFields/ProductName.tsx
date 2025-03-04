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

export default function ProductName({form,isPending}: ProductFieldProps) {
  return (
    <FormField
      disabled={isPending}
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...field} onKeyUp={(e) => e.stopPropagation()} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}