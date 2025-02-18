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
import AddDistributorForm from '../AddDistributorForm';

export default function DistributorName({ form }: Pick<TForm, 'form'>) {
  const distributors = [
    {
      title: 'Bora',
    },
    {
      title: 'Shree',
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
    {
      openDialog &&
      <AddDistributorForm openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    }
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
              {
                distributors.map((dist, index) => (
                  <SelectItem key={index} value={dist.title}>
                    {dist.title}
                  </SelectItem>
                ))
              }
              <Button 
              onClick={ () => setOpenDialog(true)}
              variant={"outline"}
              className='flex items-center gap-2 w-full'>
                <Plus/>
                Add Distributor
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
