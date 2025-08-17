'use server';

import { generateBuildingPlan } from '@/ai/flows/generate-building-plan';
import type { GenerateBuildingPlanInput, GenerateBuildingPlanOutput } from '@/ai/flows/generate-building-plan';
import { refineBuildingPlan } from '@/ai/flows/refine-building-plan';
import type { RefineBuildingPlanInput } from '@/ai/flows/refine-building-plan';
import { findNearbyShops } from '@/ai/flows/find-nearby-shops';
import type { FindNearbyShopsInput, FindNearbyShopsOutput } from '@/ai/flows/find-nearby-shops';
import { searchProperty } from '@/ai/flows/search-property';
import type { SearchPropertyInput, SearchPropertyOutput } from '@/ai/flows/search-property';


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

export async function searchPropertyAction(input: SearchPropertyInput): Promise<SearchPropertyOutput> {
  try {
    const result = await searchProperty(input);
    return result;
  } catch (error) {
    console.error("Error searching for properties:", error);
    throw new Error("Failed to search for properties.");
  }
}

export async function sendContactMessageAction(form_data: any) {
    // NOTE: This is a placeholder. In a real application, you would integrate
    // an email service like Nodemailer or SendGrid here to send the email.
    console.log("Received contact form submission:", form_data);

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // You would typically return a success or error message from your email service.
    return { success: true, message: "Message sent successfully!" };
}
