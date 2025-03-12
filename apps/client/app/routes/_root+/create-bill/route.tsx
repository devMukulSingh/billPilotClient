import { PlusCircle } from 'lucide-react';
import CreateBillForm from '~/components/bill/CreateBillForm';
import { Separator } from '~/components/ui/separator';

type Props = {};

export default function CreateBill({}: Props) {
  return (
    <div
      className="
      h-full
      w-full
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
          <PlusCircle /> Create Bill
        </h1>
        <Separator className="w-full  bg-slate-300" />
      </header>
      <CreateBillForm />
    </div>
  );
}
