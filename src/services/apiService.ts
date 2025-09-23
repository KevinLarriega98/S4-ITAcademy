export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
}