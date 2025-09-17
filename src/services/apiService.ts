export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error("API error");

    return response.json();
}