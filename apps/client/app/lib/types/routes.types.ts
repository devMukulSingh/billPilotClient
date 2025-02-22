export type TBill = {
  id: string;
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

