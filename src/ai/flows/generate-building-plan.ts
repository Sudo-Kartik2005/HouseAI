'use server';

/**
 * @fileOverview AI-powered tool to convert land measurements into building plan recommendations.
 *
 * - generateBuildingPlan - A function that handles the building plan generation process.
 * - GenerateBuildingPlanInput - The input type for the generateBuildingplan function.
 * - GenerateBuildingPlanOutput - The return type for the generateBuildingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateBuildingPlanInputSchema = z.object({
  landLength: z.number().describe('The length of the land in feet.'),
  landWidth: z.number().describe('The width of the land in feet.'),
  architecturalStyle: z
    .string()
    .describe('The architectural style for the building plan (e.g., Modern, Traditional).'),
});
export type GenerateBuildingPlanInput = z.infer<typeof GenerateBuildingPlanInputSchema>;

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
export type GenerateBuildingPlanOutput = z.infer<typeof GenerateBuildingPlanOutputSchema>;

export async function generateBuildingPlan(
  input: GenerateBuildingPlanInput
): Promise<GenerateBuildingPlanOutput> {
  return generateBuildingPlanFlow(input);
}

const textGenerationPrompt = ai.definePrompt({
  name: 'generateBuildingPlanTextPrompt',
  input: {schema: GenerateBuildingPlanInputSchema},
  output: {schema: GenerateBuildingPlanOutputSchema},
  prompt: `You are an AI-powered architectural assistant that helps users design building plans based on land measurements and architectural style.

  Given the following land measurements and architectural style, recommend the number of rooms, dimensions for each room, a basic floor plan layout, and an estimated construction cost.

  Land Length: {{landLength}} feet
  Land Width: {{landWidth}} feet
  Architectural Style: {{architecturalStyle}}

  Consider factors like optimal space utilization and the specific characteristics of the chosen architectural style when making your recommendations.

  Return the recommended number of rooms, room details (type and size), a description of the floor plan layout, and the estimated construction cost in USD.
  `,
});

const imageGenerationPrompt = ai.definePrompt({
  name: 'generateBuildingPlanImagePrompt',
  input: { schema: z.object({
    architecturalStyle: z.string(),
    floorPlanLayoutDescription: z.string(),
  })},
  prompt: `Generate a 2D floor plan for a house with a {{architecturalStyle}} style and the following description: {{floorPlanLayoutDescription}}`,
});


const generateBuildingPlanFlow = ai.defineFlow(
  {
    name: 'generateBuildingPlanFlow',
    inputSchema: GenerateBuildingPlanInputSchema,
    outputSchema: GenerateBuildingPlanOutputSchema,
  },
  async input => {
    // First, generate the textual plan.
    const {output: textOutput} = await textGenerationPrompt(input);
    if (!textOutput) {
      throw new Error('Failed to generate building plan description.');
    }

    // Then, generate an image based on the plan's description.
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: await imageGenerationPrompt.render({input: {
        architecturalStyle: input.architecturalStyle,
        floorPlanLayoutDescription: textOutput.floorPlanLayoutDescription,
      }}),
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    return {
      ...textOutput,
      planImageUri: media.url,
    };
  }
);
