
export const BASE_URL_SERVER = process.env.NODE_ENV === 'production' ? `https://billmanagementserver.onrender.com` : `http://localhost:8000/api/v1`

export const ITEM_INITIAL_VALUES = {
product:{
    id:"",
    rate:0,
    name:""
  },
  product_id: '',
  amount: 0,
  quantity: 1,
};
