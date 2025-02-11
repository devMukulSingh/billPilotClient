import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { TForm } from '../CreateBillForm';

export default function DistributorName({ form }: Pick<TForm, 'form'>) {
  const distributors = [
    {
      title: 'Bora',
    },
    {
      title: 'Shree',
    },
  ];
  return (
    <FormField
      name="distributorName"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Distributor Name</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select distributor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {distributors.map((dist, index) => (
                <SelectItem key={index} value={dist.title}>
                  {dist.title}
                </SelectItem>
              ))}
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
}
