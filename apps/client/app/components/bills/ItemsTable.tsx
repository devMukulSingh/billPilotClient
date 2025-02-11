import { ColumnDef, Row } from '@tanstack/react-table';
import { TBill } from '~/routes/_root+/bills/_index';
import { DataTable } from './DataTable';

type Props = {
  row: Row<TBill>;
};

export type TItem = {
  name: string;
  rate: number;
  quantity: number;
  amount: number;
};

export const columns: ColumnDef<TItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
export default function ItemsTable({ row }: Props) {
  const data = row.original.items;
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        renderSubComponent={() => <></>}
      />
    </>
  );
}
