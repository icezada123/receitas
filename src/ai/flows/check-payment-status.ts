
'use server';
/**
 * @fileOverview Checks the status of a PIX payment using PushinPay.
 *
 * - checkPaymentStatus - A function that returns the status of a transaction.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CheckPaymentStatusOutputSchema = z.object({
    status: z.string(),
});
export async function checkPaymentStatus(transactionId: string): Promise<z.infer<typeof CheckPaymentStatusOutputSchema> | null> {
    return checkPaymentStatusFlow(transactionId);
}

const checkPaymentStatusFlow = ai.defineFlow(
    {
        name: 'checkPaymentStatusFlow',
        inputSchema: z.string(),
        outputSchema: CheckPaymentStatusOutputSchema,
    },
    async (transactionId) => {
        const apiKey = process.env.PUSHINPAY_API_KEY;
        if (!apiKey) {
            throw new Error('PushinPay API key is not configured.');
        }
        const response = await fetch(`https://api.pushinpay.com.br/api/transactions/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error(`PushinPay API error on status check: ${response.status} ${await response.text()}`);
            return { status: 'not_found' };
        }

        const data = await response.json();
        return {
            status: data.status,
        };
    }
);
