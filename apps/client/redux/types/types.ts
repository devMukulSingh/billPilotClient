import { TApiResponse } from "lib/types/apiResponse.types"
import { TBill, TDistributor, TDomain } from "lib/types/db.types"

export type TInitialState = {
    bills : TApiResponse<TBill>
}