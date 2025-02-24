import { TBillItem } from "./db.types";

export type TBill = {
  id: string;
  distributorName: string;
  date: Date;
  isPaid: boolean;
  bill_items:TBillItem[]
};

