export type TBillItem = {
  product: {
    name: string;
    rate: number;
  }
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
  distributor: {
    name: string
  },
  domain: {
    name: string
  }
  date: Date;
  is_paid: boolean;
  bill_items: TBillItem[]
  total_amount: number,
  domain_id: string,
  distributor_id: string

};

