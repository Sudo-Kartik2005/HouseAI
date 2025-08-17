import { config } from 'dotenv';
config();

import '@/ai/schemas.ts';
import '@/ai/flows/generate-building-plan.ts';
import '@/ai/flows/refine-building-plan.ts';
import '@/ai/flows/find-nearby-shops.ts';
