import { TDistributorFormValues } from '~/components/distributor/AddDistributorDialog';

export type TDistributor = {
  id: string;
  domain: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
  name: string;
  user_id: string;
};

export type TPostDistributorArg = TDistributorFormValues & {
  userId: string | null | undefined;
};
