import { TApiResponse } from "types/apiResponse.types"
import { TBill, TDistributor, TDomain, TProduct } from "types/db.types"

export type TInitialState = {
    bills: TApiResponse<TBill>,
    products: TApiResponse<TProduct>,
    domains: TApiResponse<TDomain>,
    distributors: TApiResponse<TDistributor>,
}