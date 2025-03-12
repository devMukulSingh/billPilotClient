export type TBillItem = {
  id:string
  product: {
    id: string
    name: string;
    rate: number;
  }
  product_id: string
  quantity: number;
  amount: number;
};
export type TProduct = {
  name: string,
  rate: number,
  id: string,
  created_at: string
}

export type TDomain = {
  id: string,
  name: string,
  created_at: string,
}

export type TDistributor = {
  id: string,
  domain: {
    id: string,
    name: string,
  }
  created_at: string,
  updated_at: string,
  name: string,
  user_id: string,

}

export type TBill = {
  id: string;
  date: Date;
  domain: TDomain
  distributor: TDistributor
  is_paid: boolean;
  bill_items: TBillItem[]
  total_amount: number,
};

