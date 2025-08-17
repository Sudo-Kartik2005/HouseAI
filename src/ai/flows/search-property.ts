'use server';

/**
 * @fileOverview AI-powered tool to search for fictional property listings.
 *
 * - searchProperty - A function that handles the property search process.
 * - SearchPropertyInput - The input type for the searchProperty function.
 * - SearchPropertyOutput - The return type for the searchProperty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchPropertyInputSchema = z.object({
  location: z.string().describe('The city or zip code to search for properties in.'),
  minPrice: z.number().describe('The minimum price of the property in INR.'),
  maxPrice: z.number().describe('The maximum price of the property in INR.'),
});
export type SearchPropertyInput = z.infer<typeof SearchPropertyInputSchema>;

const PropertySchema = z.object({
  address: z.string().describe('The full address of the property.'),
  price: z.number().describe('The price of the property in INR.'),
  bedrooms: z.number().describe('The number of bedrooms.'),
  bathrooms: z.number().describe('The number of bathrooms.'),
  area: z.number().describe('The total area of the property in square feet.'),
  imageUrl: z.string().url().describe('A URL for an image of the property.'),
});

const SearchPropertyOutputSchema = z.object({
  properties: z.array(PropertySchema).describe('A list of matching properties.'),
});
export type SearchPropertyOutput = z.infer<typeof SearchPropertyOutputSchema>;

export async function searchProperty(
  input: SearchPropertyInput
): Promise<SearchPropertyOutput> {
  return searchPropertyFlow(input);
}

const searchPropertyPrompt = ai.definePrompt({
  name: 'searchPropertyPrompt',
  input: {schema: SearchPropertyInputSchema},
  output: {schema: z.object({properties: z.array(PropertySchema.omit({imageUrl: true}))})},
  prompt: `You are a real estate search engine. A user is looking for properties.

  Based on the following criteria, generate a list of 5 to 7 fictional but realistic-sounding properties. For each property, provide a plausible address, price (in INR), number of bedrooms, number of bathrooms, and square footage.

  Location: {{location}}
  Price Range: ₹{{minPrice}} - ₹{{maxPrice}}
  `,
});

const searchPropertyFlow = ai.defineFlow(
  {
    name: 'searchPropertyFlow',
    inputSchema: SearchPropertyInputSchema,
    outputSchema: SearchPropertyOutputSchema,
  },
  async input => {
    const {output} = await searchPropertyPrompt(input);
    if (!output) {
      throw new Error('Failed to generate property listings.');
    }
    
    // Add placeholder image URLs to each property
    const propertiesWithImages = output.properties.map(property => ({
        ...property,
        imageUrl: `https://placehold.co/600x400.png`
    }));

    return { properties: propertiesWithImages };
  }
);
