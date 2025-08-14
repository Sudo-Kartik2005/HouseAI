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
import { GenerateBuildingPlanOutputSchema } from '@/ai/schemas';

const GenerateBuildingPlanInputSchema = z.object({
  landLength: z.number().describe('The length of the land in feet.'),
  landWidth: z.number().describe('The width of the land in feet.'),
  architecturalStyle: z
    .string()
    .describe('The architectural style for the building plan (e.g., Modern, Traditional).'),
});
export type GenerateBuildingPlanInput = z.infer<typeof GenerateBuildingPlanInputSchema>;

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

  Return the recommended number of rooms, room details (type and size), a description of the floor plan layout, and the estimated construction cost in INR.
  `,
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
      prompt: `Generate a 2D floor plan for a house with a ${input.architecturalStyle} style and the following description: ${textOutput.floorPlanLayoutDescription}`,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    return {
      ...textOutput,
      planImageUri: media.url,
    };
  }
);
