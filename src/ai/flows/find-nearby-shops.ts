'use server';

/**
 * @fileOverview AI-powered tool to find nearby shops based on a user's address.
 *
 * - findNearbyShops - A function that handles finding nearby shops.
 * - FindNearbyShopsInput - The input type for the findNearbyShops function.
 * - FindNearbyShopsOutput - The return type for the findNearbyShops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindNearbyShopsInputSchema = z.object({
  address: z.string().describe('The address to search for nearby shops from. e.g., "1600 Amphitheatre Parkway, Mountain View, CA"'),
});
export type FindNearbyShopsInput = z.infer<typeof FindNearbyShopsInputSchema>;

const ShopSchema = z.object({
    name: z.string().describe("The name of the shop."),
    category: z.string().describe("The category of the shop (e.g., Grocery, Restaurant, Pharmacy)."),
    address: z.string().describe("The full address of the shop."),
});

const FindNearbyShopsOutputSchema = z.object({
    shops: z.array(ShopSchema).describe("A list of nearby shops."),
});
export type FindNearbyShopsOutput = z.infer<typeof FindNearbyShopsOutputSchema>;


export async function findNearbyShops(
  input: FindNearbyShopsInput
): Promise<FindNearbyShopsOutput> {
  return findNearbyShopsFlow(input);
}

const findShopsPrompt = ai.definePrompt({
  name: 'findNearbyShopsPrompt',
  input: {schema: FindNearbyShopsInputSchema},
  output: {schema: FindNearbyShopsOutputSchema},
  prompt: `You are a helpful local guide. A user has provided their address and wants to find shops nearby.

  Based on the address "{{address}}", generate a list of 5 to 7 fictional but realistic-sounding shops.

  Include a mix of categories like "Grocery", "Restaurant", "Cafe", and "Pharmacy". For each shop, provide a name, its category, and a plausible, complete street address near the user's location.
  `,
});

const findNearbyShopsFlow = ai.defineFlow(
  {
    name: 'findNearbyShopsFlow',
    inputSchema: FindNearbyShopsInputSchema,
    outputSchema: FindNearbyShopsOutputSchema,
  },
  async input => {
    const {output} = await findShopsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate nearby shops.');
    }
    return output;
  }
);
