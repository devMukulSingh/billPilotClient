import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { DataTable } from "~/components/bills/DataTable";
import ItemsTable from "~/components/bills/ItemsTable";
import { Separator } from "~/components/ui/separator";
export const payments: TBill[] = [
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    distributorName: "Bora",
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: "a4regiter",
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
];

type Props = {};
export type TBill = {
  distributorName: string;
  date: Date;
  isPaid: boolean;
  items: {
    name: string;
    rate: number;
    quantity: number;
    amount: number;
  }[];
};

export const columns: ColumnDef<TBill>[] = [
  {
    accessorKey: "distributorName",
    header: "Distributor",
  },
  {
    accessorKey: "expander",
    header: "Items",
    cell: ({ row }) => (
      <button
        {...{
          onClick: row.getToggleExpandedHandler(),
          className: "flex gap-3",
        }}
      >
        {row.original.items.length}
        {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
      </button>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (row.getValue("isPaid") ? "Yes" : "No"),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue, row }) => format(row.getValue("date"), "Pp"),
  },
];
export default function Bills({}: Props) {
  return (
    <div
      className="
    flex
    flex-col
    gap-5
    "
    >
      <header className="space-y-2 p-5">
        <h1
          className="
        sm:text-3xl 
        text-2xl 
        font-medium
        text-neutral-800
        flex
        items-center
        gap-2
        "
        >
          <Package />
          All Bills
        </h1>
        <Separator className="bg-white" />
      </header>
      <DataTable
        columns={columns}
        data={payments}
        renderSubComponent={ItemsTable}
      />
    </div>
  );
}
