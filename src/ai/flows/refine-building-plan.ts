'use server';

/**
 * @fileOverview AI-powered tool to refine a building plan based on user feedback.
 *
 * - refineBuildingPlan - A function that handles the building plan refinement process.
 * - RefineBuildingPlanInput - The input type for the refineBuildingPlan function.
 * - RefineBuildingPlanOutput - The return type for the refineBuildingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateBuildingPlanOutput } from './generate-building-plan';
import { GenerateBuildingPlanOutputSchema } from '@/ai/schemas';

const RefineBuildingPlanInputSchema = z.object({
  currentPlan: GenerateBuildingPlanOutputSchema.describe("The current building plan that needs refinement."),
  userRequest: z.string().describe("The user's request for changes to the plan. For example: 'Make the kitchen bigger' or 'Add another bathroom'.")
});
export type RefineBuildingPlanInput = z.infer<typeof RefineBuildingPlanInputSchema>;

export type RefineBuildingPlanOutput = GenerateBuildingPlanOutput;

export async function refineBuildingPlan(
  input: RefineBuildingPlanInput
): Promise<RefineBuildingPlanOutput> {
  return refineBuildingPlanFlow(input);
}

const textRefinementPrompt = ai.definePrompt({
  name: 'refineBuildingPlanTextPrompt',
  input: {schema: RefineBuildingPlanInputSchema},
  output: {schema: GenerateBuildingPlanOutputSchema},
  prompt: `You are an AI-powered architectural assistant. A user has provided an existing building plan and a request to modify it.

  Your task is to generate a new, updated building plan that incorporates the user's requested changes. You must modify all relevant fields of the plan, including the number of rooms, room details, floor plan description, and estimated cost.

  **Current Plan:**
  - Recommended Number of Rooms: {{currentPlan.recommendedNumberOfRooms}}
  - Room Details:
    {{#each currentPlan.roomDetails}}
    - {{this.type}}: {{this.size}}
    {{/each}}
  - Floor Plan Layout: {{currentPlan.floorPlanLayoutDescription}}
  - Estimated Cost: \${{currentPlan.estimatedCost}}

  **User's Refinement Request:**
  "{{userRequest}}"

  Now, generate the updated and complete building plan based on this request.
  `,
});

const refineBuildingPlanFlow = ai.defineFlow(
  {
    name: 'refineBuildingPlanFlow',
    inputSchema: RefineBuildingPlanInputSchema,
    outputSchema: GenerateBuildingPlanOutputSchema,
  },
  async (input) => {
    // Generate the refined textual plan
    const {output: refinedTextOutput} = await textRefinementPrompt(input);
    if (!refinedTextOutput) {
      throw new Error('Failed to generate refined building plan description.');
    }

    // Generate a new image based on the refined description
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a 2D floor plan based on the following description: ${refinedTextOutput.floorPlanLayoutDescription}`,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    return {
      ...refinedTextOutput,
      planImageUri: media.url,
    };
  }
);
