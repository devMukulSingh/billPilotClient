import { TCreateBillFormValues } from "~/components/bill/CreateBillForm";
import { TDistributor } from "./distributor";
import { TDomain } from "./domain";

export type TBillItem = {
    id: string
    product: {
        id: string
        name: string;
        rate: number;
    }
    product_id: string
    quantity: number;
    amount: number;
};

export type TBill = {
    id: string;
    date: Date;
    domain: TDomain
    distributor: TDistributor
    is_paid: boolean;
    bill_items: TBillItem[]
    total_amount: number,
};

export type TGetBillsArg = {
    page:string,
    limit:string
}

export type TCreateBillMutationArg = Omit<TCreateBillFormValues, 'date'> & { totalAmount: number; date: string }

