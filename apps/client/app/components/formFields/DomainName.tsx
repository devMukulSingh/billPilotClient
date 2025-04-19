import { DomainFieldProps } from './formFields.types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
type Props = {};

export default function DomainName({ form, isPending }: DomainFieldProps) {
  return (
    <Form {...form}>
      <FormField
        disabled={isPending}
        name="domain_name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} onKeyUp={(e) => e.stopPropagation()} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
