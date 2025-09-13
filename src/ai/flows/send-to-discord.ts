
'use server';
/**
 * @fileOverview Sends a message to a Discord webhook.
 * 
 * - sendToDiscord - A function that sends a given message to a pre-configured Discord webhook.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function sendToDiscord(message: string): Promise<void> {
    await sendToDiscordFlow(message);
}

const sendToDiscordFlow = ai.defineFlow(
    {
        name: 'sendToDiscordFlow',
        inputSchema: z.string(),
        outputSchema: z.void(),
    },
    async (message) => {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            throw new Error('Discord webhook URL is not configured.');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to send message to Discord: ${response.status} ${errorBody}`);
        }
    }
);
