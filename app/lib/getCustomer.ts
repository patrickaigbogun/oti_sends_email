
import { CustomerData } from "@/types/templates";
import { baseUrl } from "@/utils/constants";

export async function getRecentCustomers(): Promise<CustomerData[]> {
  // Add timestamp to prevent caching
  const timestamp = new Date().getTime();
  const apiUrl = `${baseUrl}/api/get_customer?t=${timestamp}`;

  try {
    const response = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as CustomerData[];
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers. Please check your API configuration.');
  }
}