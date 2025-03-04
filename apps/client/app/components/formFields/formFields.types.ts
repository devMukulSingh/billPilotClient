import { FieldValues, UseFormReturn } from "react-hook-form";
import { TDistributorFormValues } from "../distributor/AddDistributorDialog";
import { TDomainFormValues } from "../domain/AddDomainDialog";

export type DistributorFieldProps = {isPending:boolean} & {
    form: UseFormReturn<TDistributorFormValues , any, undefined>;
};

export type DomainFieldProps = { isPending: boolean } & {
    form: UseFormReturn<TDomainFormValues, any, undefined>;
};
