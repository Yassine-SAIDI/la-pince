import { getCurrencies } from '@/lib/currencies';
import {z} from 'zod';

export const UpdateUserCurrencySchema = z.object({
    currency: z.custom(async (value) =>{
        const currencies = await getCurrencies();
        const found: boolean = currencies.some((c: { code: string }) => c.code === value);
        if(!found){
            throw new Error(`Currency not found: ${value}`);
        }
        return value;
    }),
    });