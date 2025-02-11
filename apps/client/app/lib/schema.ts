import { z } from 'zod';

export const createBillSchema = z.object({
  distributorName: z
    .string({
      required_error: 'Distributor name is required',
    })
    .trim()
    .min(1, {
      message: 'Distributor name is required',
    })
    .max(30, {
      message: 'Max 30 characters allowed',
    }),
  date: z.date({ required_error: 'Date is required' }),
  isPaid: z.boolean().default(false),
  items: z
    .object({
      name: z
        .string({
          required_error: 'Item name is required',
        })
        .trim()
        .min(1, {
          message: 'Item name is required',
        })
        .max(30, {
          message: 'Max 100 characters allowed',
        }),
      rate: z.coerce.number({
        required_error: 'rate is required',
        invalid_type_error: 'Only numbers allowed',
      }),
      quantity: z.coerce.number({
        required_error: 'quantity is required',
        invalid_type_error: 'Only numbers allowed',
      }),
      amount: z.coerce.number({
        required_error: 'amount is required',
        invalid_type_error: 'Only numbers allowed',
      }),
    })
    .array()
    .min(1, { message: 'Atleast one item is required' }),
});
