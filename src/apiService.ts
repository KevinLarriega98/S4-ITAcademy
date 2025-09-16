export interface Joke {
    id: string;
    joke: string;
    status: number;
}

export async function getJoke(): Promise<Joke> {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching joke");
    }

    return response.json();
}