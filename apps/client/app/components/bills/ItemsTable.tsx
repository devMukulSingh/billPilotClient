import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { TBill } from '~/lib/types/routes.types';
import { TBillItem } from '~/lib/types/db.types';

type Props = {
  row: Row<TBill>;
};


export const columns: ColumnDef<TBillItem>[] = [
  {
    accessorKey: 'item.name',
    header: 'Name',
  },
  {
    accessorKey: 'item.rate',
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
  const data = row.original.bill_items;
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
