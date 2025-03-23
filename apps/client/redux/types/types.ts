import { TApiResponse } from "lib/types/apiResponse.types"
import { TBill, TDistributor, TDomain, TProduct } from "lib/types/db.types"

export type TInitialState = {
    bills : TApiResponse<TBill>,
    products : TApiResponse<TProduct>,
}