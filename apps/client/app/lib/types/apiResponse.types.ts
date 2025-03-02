import { TDistributor } from "./db.types"


export type TApiResponse<Data> = {
   data: Data[],
   count:number
}