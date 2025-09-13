
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe-from-prompt.ts';
import '@/ai/flows/refine-recipe-based-on-feedback.ts';
import '@/ai/flows/create-payment.ts';
