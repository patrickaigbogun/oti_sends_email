import { CustomerData } from "@/types/objects";
// import { Config } from "@/utils/config";

  
  // lib/getCustomer.ts
  export async function fetchCustomers(): Promise<CustomerData[]> {
    // Use absolute URL path starting with http:// or https://
    // Or use relative URL with proper base path
    const baseUrl = 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/get_customer`;
  
    try {
      const response = await fetch(apiUrl, { 
        headers: {
          'Content-Type': 'application/json',
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
  