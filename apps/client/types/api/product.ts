import { TProductFormValues } from '~/components/product/AddProductDialog';

export type TProduct = {
  name: string;
  rate: number;
  id: string;
  created_at: string;
};

export type TPostProductArg = TProductFormValues & {
  userId: string | null | undefined;
};
