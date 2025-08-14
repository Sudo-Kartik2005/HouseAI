'use server';

import { generateBuildingPlan } from '@/ai/flows/generate-building-plan';
import type { GenerateBuildingPlanInput, GenerateBuildingPlanOutput } from '@/ai/flows/generate-building-plan';

export async function generateBuildingPlanAction(input: GenerateBuildingPlanInput): Promise<GenerateBuildingPlanOutput> {
  // In a real app, you could add validation, user authentication checks, etc. here.
  try {
    const result = await generateBuildingPlan(input);
    return result;
  } catch (error) {
    console.error("Error generating building plan:", error);
    // In a real app, you might want to throw a more user-friendly error
    throw new Error("Failed to generate building plan.");
  }
}
