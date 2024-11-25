'use server';

import { Template } from "@/types/templates";
import { baseUrl } from "@/utils/constants";




export default async function getRecentTemplates(): Promise<Template[]> {
	// Add timestamp to prevent caching
	const timestamp = new Date().getTime();
	const apiUrl = `${baseUrl}/api/get_recents?t=${timestamp}`;

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
		console.log(data)
		return data as Template[];
	} catch (error) {
		console.error('Error fetching templates:', error);
		throw new Error('Failed to fetch templates. Please check your API configuration.');
	}
}