import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { billSchema } from 'lib/schema';
import { Form } from '../ui/form';
import DateCreated from '../formFields/Date';
import IsPaid from '../formFields/IsPaid';
import { Separator } from '../ui/separator';
import ProductRate from './formFields/ProductRate';
import ProductQuantity from './formFields/ProductQuantity';
import ProductAmount from './formFields/ProductAmount';
import { Button } from '../ui/button';
import { PlusCircle, X } from 'lucide-react';
import { BASE_URL_SERVER, ITEM_INITIAL_VALUES } from 'lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import { lazy, Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';
const ProductName = lazy(() => import('./formFields/ProductName'));
const Distributor = lazy(() => import('./formFields/Distributor'));
const Domain = lazy(() => import('./formFields/Domain'));

type Props = {};

const createBillSchema = billSchema.omit({
  distributor_name: true,
  domain_name: true,
});

export type TCreateBillFormValues = z.infer<typeof createBillSchema>;

export type TForm = {
  form: UseFormReturn<TCreateBillFormValues, any, undefined>;
  index: number;
};

export default function CreateBillForm({}: Props) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    any,
    any,
    Omit<TCreateBillFormValues, 'date'> & { totalAmount: number; date: string }
  >({
    mutationKey: ['post_bill'],
    mutationFn: async (data) => {
      return (await axios.post(`${BASE_URL_SERVER}/${userId}/bill`, data)).data;
    },
    onSuccess: () => {
      toast.success('Bill added'),
        queryClient.invalidateQueries({
          queryKey: ['get_bills'],
        });
    },
  });
  const form = useForm<TCreateBillFormValues>({
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
  function onSubmit(data: TCreateBillFormValues) {
    mutate({
      ...data,
      date: data.date.toISOString(),
      totalAmount,
    });
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className=" flex max-h-[85vh]    lg:w-2/3 
              w-full    border-black  flex-col gap-5 px-5 pb-20 overflow-auto"
        >
          <Form {...form}>
            <div
              className="
           
              grid 
              border-2 
              lg:grid-cols-3 
              md:grid-cols-2 
              grid-cols-1 
              gap-x-4 
              gap-y-5
              border-white
              p-5
        "
            >
              <Suspense fallback={<Skeleton className="w-full h-9" />}>
                <Domain form={form} />
              </Suspense>
              <Suspense fallback={<Skeleton className="w-full h-9" />}>
                <Distributor form={form} />
              </Suspense>
              <IsPaid form={form} />
              <DateCreated form={form} />
            </div>
            <div
              className="
              flex
              border-2 
              flex-col
              gap-3
              p-5
          
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
                  <Suspense fallback={<Skeleton className="w-1/2 h-9" />}>
                    <ProductName form={form} index={index} />
                  </Suspense>
                  <ProductQuantity form={form} index={index} />
                  <ProductRate form={form} index={index} />
                  <ProductAmount form={form} index={index} />
                  <Button
                    type='button'
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
                variant={'outline'}
                onClick={handleAddItem}
                type="button"
                className="items-center w-fit  "
              >
                <PlusCircle />
                Add Product
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
