import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { billSchema } from '~/lib/schema';
import { Form } from '../ui/form';
import DistributorName from './formFields/DistributorName';
import DateCreated from './formFields/Date';
import IsPaid from './formFields/IsPaid';
import { Separator } from '../ui/separator';
import ItemName from './formFields/ItemName';
import ItemRate from './formFields/ItemRate';
import ItemQuantity from './formFields/ItemQuantity';
import ItemAmount from './formFields/ItemAmount';
import { Button } from '../ui/button';
import { PlusCircle, X } from 'lucide-react';
import { BASE_URL_SERVER, ITEM_INITIAL_VALUES } from '~/lib/constants';
import Domain from './formFields/Domain';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';

type Props = {};

const createBillSchema = billSchema.omit({
  distributor_name: true,
  domain_name: true,
});

type TFormValues = z.infer<typeof createBillSchema>;

export type TForm = {
  form: UseFormReturn<TFormValues, any, undefined>;
  index: number;
};

export default function CreateBillForm({}: Props) {
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<any, any, TFormValues & {totalAmount:number}>({
    mutationKey: ['post_bill'],
    mutationFn: async (data) => {
      return (
        await axios.post(`${BASE_URL_SERVER}/${userId}/bill/post-bill`, data)
      ).data;
    },
    onSuccess: () => toast.success('Bill added'),
  });
  const form = useForm<TFormValues>({
    resolver: zodResolver(createBillSchema),
    defaultValues: {
      is_paid: false,
      date: new Date(),
      distributor_id: '',
      domain_id: '',
      bill_items: [ITEM_INITIAL_VALUES],
    },
  });
  const fieldArray = useFieldArray({
    name: 'bill_items',
    control: form.control,
  });
  const watchFieldsArray = form.watch('bill_items');

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  function handleAddItem() {
    fieldArray.append(ITEM_INITIAL_VALUES);
  }
  function handleRemoveItem(index: number) {
    fieldArray.remove(index);
  }
  const totalAmount = form
    .getValues()
    .bill_items.reduce((prev, curr) => prev + curr.amount, 0);
  function onSubmit(data: TFormValues) {
    mutate({
      ...data,
      totalAmount
    });
  }
  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto">
          <Form {...form}>
            <div
              className="
              lg:w-3/4 
              w-full 
              grid 
              border-2 
              lg:grid-cols-3 
              md:grid-cols-2 
              grid-cols-1 
              gap-x-2 
              gap-y-5
              border-white
              p-5
        "
            >
              <Domain form={form} />
              <DistributorName form={form} />
              <DateCreated form={form} />
              <IsPaid form={form} />
            </div>
            <div
              className="
              flex
              border-2 
              flex-col
              gap-3
              p-5
              lg:w-2/3 
              border-white
        "
            >
              <h1 className="text-2xl">Items</h1>
              <Separator className="bg-slate-300" />

              {controlledFields.map((field, index) => (
                <div
                  key={index}
                  className=" 
                  flex
                  gap-x-1
                  gap-y-5
        "
                >
                  <ItemName form={form} index={index} />
                  <ItemQuantity form={form} index={index} />
                  <ItemRate form={form} index={index} />
                  <ItemAmount form={form} index={index} />
                  <Button
                    variant={'destructive'}
                    className="rounded-full  size-9 self-end ml-auto"
                    disabled={controlledFields.length === 1}
                    size={'icon'}
                    onClick={() => handleRemoveItem(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <Button
                onClick={handleAddItem}
                type="button"
                className="items-center w-fit  "
              >
                <PlusCircle />
                Add new Item
              </Button>
            </div>
          </Form>
        </div>
        <footer
          className="
          bottom-0 
          bg-slate-100 
          px-5 py-3 
          md:w-[calc(100vw-15rem)]
          w-[calc(100vw-5rem)]
          absolute  
        "
        >
          <div className="w-full md:w-2/3 flex justify-between">
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
            <h1 className="text-xl font-semibold">
              Total {': ₹'}
              {totalAmount}
            </h1>
          </div>
        </footer>
      </form>
    </>
  );
}
