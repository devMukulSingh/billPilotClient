import { TBill } from './types/routes.types';

export const BASE_URL_SERVER = process.env.NODE_ENV==='production' ? "" : `http://localhost:8000/api/v1`

export const ITEM_INITIAL_VALUES = {
  amount: 0,
  name: '',
  quantity: 1,
  rate: 0,
};

export const Bills: TBill[] = [
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '3',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
  {
    id: '1',
    distributorName: 'Bora',
    date: new Date(),
    isPaid: false,
    items: [
      {
        name: 'a4regiter',
        rate: 100,
        quantity: 10,
        amount: 1000,
      },
    ],
  },
];
