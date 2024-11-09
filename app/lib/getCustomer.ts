'use server'

export async function fetchCustomers() {
    const response = await fetch('/api/get_customer', { cache: 'no-store' }); // `no-store` for dynamic data
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return response.json();
  }