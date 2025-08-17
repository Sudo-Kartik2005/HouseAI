'use server';

import { generateBuildingPlan } from '@/ai/flows/generate-building-plan';
import type { GenerateBuildingPlanInput, GenerateBuildingPlanOutput } from '@/ai/flows/generate-building-plan';
import { refineBuildingPlan } from '@/ai/flows/refine-building-plan';
import type { RefineBuildingPlanInput } from '@/ai/flows/refine-building-plan';
import { findNearbyShops } from '@/ai/flows/find-nearby-shops';
import type { FindNearbyShopsInput, FindNearbyShopsOutput } from '@/ai/flows/find-nearby-shops';


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

export async function refineBuildingPlanAction(input: RefineBuildingPlanInput): Promise<GenerateBuildingPlanOutput> {
  try {
    const result = await refineBuildingPlan(input);
    return result;
  } catch (error) {
    console.error("Error refining building plan:", error);
    throw new Error("Failed to refine building plan.");
  }
}

export async function findNearbyShopsAction(input: FindNearbyShopsInput): Promise<FindNearbyShopsOutput> {
    try {
        const result = await findNearbyShops(input);
        return result;
    } catch (error) {
        console.error("Error finding nearby shops:", error);
        throw new Error("Failed to find nearby shops.");
    }
}
