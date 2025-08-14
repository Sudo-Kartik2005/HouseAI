/**
 * @fileOverview Shared Zod schemas for AI flows.
 */

import {z} from 'genkit';

export const GenerateBuildingPlanOutputSchema = z.object({
  recommendedNumberOfRooms: z
    .number()
    .describe('The AI-recommended number of rooms for the given land size.'),
  roomDetails: z
    .array(
      z.object({
        type: z.string().describe('The type of room (e.g., bedroom, living room, kitchen).'),
        size: z.string().describe('The recommended size of the room (e.g., 12x12 feet).'),
      })
    )
    .describe('Details for each room, including type and size.'),
  floorPlanLayoutDescription: z
    .string()
    .describe('A textual description of the basic floor plan layout.'),
  estimatedCost: z.number().describe('The estimated construction cost in USD.'),
  planImageUri: z
    .string()
    .optional()
    .describe(
      "An optional image of the floor plan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'" /* cspell:disable-line */
    ),
});
