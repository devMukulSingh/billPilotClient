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
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddDomainForm from '../AddDomainForm';

export default function Domain({ form }: Pick<TForm, 'form'>) {
  const domains = [
    {
      title: 'Stationary',
    },
    {
      title: 'Electronics',
    },
  ];
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
    <AddDomainForm openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    <FormField
      name="domain"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Domain</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {domains.map((domain, index) => (
                <SelectItem key={index} value={domain.title}>
                  {domain.title}
                </SelectItem>
              ))}
              <Button
                onClick={() => setOpenDialog(true)}
                variant={'outline'}
                className="flex items-center gap-2 w-full"
              >
                <Plus />
                Add Domain
              </Button>
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
    </>
  );
}
