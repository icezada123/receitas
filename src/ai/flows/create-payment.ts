
'use server';
/**
 * @fileOverview Creates a PIX payment using PushinPay.
 *
 * - createPayment - A function that takes user data and returns a PIX QR code.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreatePaymentInputSchema = z.object({
    email: z.string().email(),
    phone: z.string(),
});

const CreatePaymentOutputSchema = z.object({
    qr_code_base64: z.string(),
    qr_code: z.string(),
    transaction_id: z.string(),
});

export async function createPayment(input: z.infer<typeof CreatePaymentInputSchema>): Promise<z.infer<typeof CreatePaymentOutputSchema> | null> {
    return createPaymentFlow(input);
}

const createPaymentFlow = ai.defineFlow(
    {
        name: 'createPaymentFlow',
        inputSchema: CreatePaymentInputSchema,
        outputSchema: CreatePaymentOutputSchema,
    },
    async (input) => {
        const apiKey = process.env.PUSHINPAY_API_KEY;
        if (!apiKey) {
            throw new Error('PushinPay API key is not configured.');
        }

        const webhookUrl = process.env.WEBHOOK_URL;
        if (!webhookUrl) {
            throw new Error('Webhook URL is not configured.');
        }

        const response = await fetch('https://api.pushinpay.com.br/api/pix/cashIn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: 199, // R$ 1,99 em centavos
                webhook_url: webhookUrl,
                payer_contact: input.phone,
                payer_email: input.email,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`PushinPay API error: ${response.status} ${errorBody}`);
        }

        const data = await response.json();

        return {
            qr_code_base64: data.qr_code_base64,
            qr_code: data.qr_code,
            transaction_id: data.id,
        };
    }
);
