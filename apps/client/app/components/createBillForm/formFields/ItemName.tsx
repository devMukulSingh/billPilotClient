import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TForm } from '../CreateBillForm';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import { useAuth } from '@clerk/remix';
import { TItem } from '~/lib/types/db.types';
import { PlusCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import AddItemForm from '../AddItemForm';
import { useState } from 'react';

export default function ItemName({ form, index }: TForm) {
  const { userId } = useAuth();
  const { data } = useQuery<any, any, TItem[]>({
    queryKey: ['get_items'],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL_SERVER}/${userId}/item/get-all-items`)
      ).data;
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      {openDialog && (
        <AddItemForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
      <FormField
        name={`bill_items.${index}.name`}
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/2 ">
            <FormLabel>Name</FormLabel>
            <Select
              onValueChange={(val) => {
                field.onChange(val);
                const rate = data?.find( item => item.id === val)?.rate;
                form.setValue(`bill_items.${index}.rate`, (rate || 0));
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((item, index) => (
                  <SelectItem value={item.id} key={index}>
                    {item.name}
                  </SelectItem>
                ))}
                <Button
                  className="w-full"
                  variant={'ghost'}
                  onClick={() => setOpenDialog(true)}
                >
                  <PlusCircle />
                  <h1>Add new Item</h1>
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
