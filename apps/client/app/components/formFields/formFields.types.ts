import { UseFormReturn } from "react-hook-form";
import { TDistributorFormValues } from "../distributor/AddDistributorDialog";

export type FieldsProps = {
    form: UseFormReturn<TDistributorFormValues, any, undefined>;
    isPending: boolean;
};