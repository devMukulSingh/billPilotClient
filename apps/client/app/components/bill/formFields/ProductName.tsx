import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '~/components/ui/form';
import { TCreateBillFormValues, TForm } from '../CreateBillForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import { useAuth } from '@clerk/remix';
import { TProduct } from 'lib/types/db.types';
import { PlusCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import AddProductDialog from '../../product/AddProductDialog';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TApiResponse } from 'lib/types/apiResponse.types';

export default function ProductName({ form, index }: TForm) {
  const { userId } = useAuth();
  const { data } = useQuery<any, any, TProduct[]>({
    queryKey: ['get_all_products'],
    queryFn: async () => {
      return (
        await axios.get(`${BASE_URL_SERVER}/${userId}/product/get-all-products`)
      ).data;
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  function onSelect({
    field,
    selectedValue,
  }: {
    selectedValue: string;
    field: ControllerRenderProps<TCreateBillFormValues>;
  }) {
    field.onChange(selectedValue);
    const rate = data?.find((item) => item.id === selectedValue)?.rate;
    if (!rate) {
      console.error('Rate is undefined');
      return toast.error('Something went wrong, please contact the developer.');
    }
    const quantity = form.getValues(`bill_items.${index}.quantity`);
    form.setValue(`bill_items.${index}.product.rate`, rate || 0);
    form.setValue(`bill_items.${index}.amount`, rate * quantity);
  }
  return (
    <>
      {openDialog && (
        <AddProductDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      <FormField
        name={`bill_items.${index}.product_id`}
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/2 ">
            <FormLabel>Name</FormLabel>
            <Select
              onValueChange={(val) => onSelect({ selectedValue: val, field })}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Product" />
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
                  <h1>Add new Product</h1>
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
