import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '../commons/DataTable';
import { TBill } from 'types/db.types';
import { TBillItem } from 'types/db.types';

type Props = {
  row: Row<TBill>;
};

export const columns: ColumnDef<TBillItem>[] = [
  {
    accessorKey: 'product.name',
    header: 'Name',
  },
  {
    accessorKey: 'product.rate',
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
