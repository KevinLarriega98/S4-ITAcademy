import { displayJoke } from "../ui/uiService.js";

export interface Joke {
    id: string;
    joke: string;
    status: number;
}

export interface ReportJoke {
    joke: string;
    score: number;
    date: string;
}

const reportJokes: ReportJoke[] = [];

export async function fetchJoke(): Promise<Joke> {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) throw new Error("Error fetching joke");
    return response.json();
}

export async function loadJoke() {
    try {
        const jokeData = await fetchJoke();
        displayJoke(jokeData.joke);
    } catch (error) {
        console.error(error);
        displayJoke("Error loading joke 😢");
    }
}

export function addReport(joke: string, score: number) {
    const existingIndex = reportJokes.findIndex(r => r.joke === joke);
    if (existingIndex !== -1) {
        reportJokes[existingIndex].score = score;
        reportJokes[existingIndex].date = new Date().toISOString();
    } else {
        reportJokes.push({ joke, score, date: new Date().toISOString() });
    }
    console.log(reportJokes);
}

// Función para obtener los reportes (si es necesario)
// export function getReports(): ReportJoke[] {
//     return reportJokes;
// }