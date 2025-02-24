import { TBill } from './types/routes.types';

export const BASE_URL_SERVER = process.env.NODE_ENV==='production' ? "" : `http://localhost:8000/api/v1`

export const ITEM_INITIAL_VALUES = {
  item:{
    id:"",
    rate:0,
    name:""
  },
  item_id: '',
  amount: 0,
  quantity: 1,
};

