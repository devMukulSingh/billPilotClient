import { Edit } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { billSchema } from 'lib/schema';
import { PlusCircle, X } from 'lucide-react';
import { BASE_URL_SERVER, ITEM_INITIAL_VALUES } from 'lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/remix';
import { TCreateBillFormValues } from '~/components/bill/CreateBillForm';
import { useParams, useSearchParams } from '@remix-run/react';
import { TApiResponse } from 'types/apiResponse.types';
import { Separator } from '~/components/ui/separator';
import { Form } from '~/components/ui/form';
import Domain from '~/components/bill/formFields/Domain';
import DistributorName from '~/components/bill/formFields/Distributor';
import DateCreated from '~/components/formFields/Date';
import IsPaid from '~/components/formFields/IsPaid';
import ProductName from '~/components/bill/formFields/ProductName';
import ProductQuantity from '~/components/bill/formFields/ProductQuantity';
import ProductRate from '~/components/bill/formFields/ProductRate';
import ProductAmount from '~/components/bill/formFields/ProductAmount';
import { Button } from '~/components/ui/button';
import { formatISO, parseISO } from 'date-fns';
import {
  useGetBillsQuery,
  useUpdateBillMutation,
} from 'services/bill/billApiSlice';
import { useAppSelector } from 'redux/hooks/hook';
import { TBill } from 'types/api/bills';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllDomainsQuery } from 'services/domain/domainSlice';
import { useGetAllDistributorsQuery } from 'services/distributor/distributorApiSlice';

type Props = {};

export default function EditBill({}: Props) {
  return (
    <div
      className="
    h-screen 
    w-[calc(100vw-15rem)] 
    bg-slate-200
    flex
    flex-col
    relative
    "
    >
      <header className="flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5">
        <h1
          className="text-2xl gap-2 sm:text-3xl font-medium flex items-center
        "
        >
          <Edit /> Edit Bill
        </h1>
        <Separator className="w-full  bg-slate-300" />
      </header>
      <EditBillForm />
    </div>
  );
}

function EditBillForm({}: Props) {
  const [selectedBill, setSelectedBill] = useState<TBill | undefined>(
    undefined
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const { billId } = useParams();

  const [trigger, { isLoading }] = useUpdateBillMutation();
  const { data } = useGetBillsQuery({
    limit,
    page,
    userId,
  });

  const editBillSchema = billSchema.omit({
    distributor_name: true,
    domain_name: true,
  });

  const form = useForm<TCreateBillFormValues>({
    resolver: zodResolver(editBillSchema),
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
  useEffect(() => {
    setTotalAmount(
      form.getValues().bill_items.reduce((prev, curr) => prev + curr.amount, 0)
    );
  }, [form.getValues().bill_items]);
  useEffect(() => {
    //setting default values for the form
    if (!data) return;
    const selectedBill = data?.data.find((bill) => bill.id === billId);
    if (!selectedBill) return;
    form.reset({
      distributor_id: selectedBill.distributor.id,
      domain_id: selectedBill.domain.id,
      date: selectedBill.date,
      is_paid: selectedBill.is_paid,
      bill_items: selectedBill.bill_items.map((billItem) => ({
        amount: billItem.amount,
        quantity: billItem.quantity,
        product_id: billItem.product.id,
        id: billItem.id,
        product: {
          id: billItem.product.id,
          rate: billItem.product.rate,
        },
      })),
    });
  }, [data]);
  async function onSubmit(data: TCreateBillFormValues) {
    try {
      await trigger({
        ...data,
        userId,
        id: billId,
        totalAmount,
        date: data.date.toISOString(),
      }).unwrap();
      toast.success('Bill edited');
    } catch (e) {
      console.log(e);
      toast.error(`Unable to edit bill, please contact the developer`);
    }
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
                  <ProductName form={form} index={index} />
                  <ProductQuantity form={form} index={index} />
                  <ProductRate form={form} index={index} />
                  <ProductAmount form={form} index={index} />
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
            <Button disabled={isLoading} type="submit">
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
