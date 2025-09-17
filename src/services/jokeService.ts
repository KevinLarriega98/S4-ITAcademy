import { displayJoke } from "../ui/uiService.js";

export interface Joke {
    id: string;
    joke: string;
    source: "dad" | "chuck";
}

export interface ReportJoke {
    joke: string;
    score: number;
    date: string;
    source: "dad" | "chuck";
}

const reportJokes: ReportJoke[] = [];

async function fetchDadJoke(): Promise<Joke> {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });
    if (!response.ok) throw new Error("Error fetching dad joke");
    const data = await response.json();
    return {
        id: data.id,
        joke: data.joke,
        source: "dad"
    };
}

async function fetchChuckJoke(): Promise<Joke> {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) throw new Error("Error fetching chuck norris joke");
    const data = await response.json();
    return {
        id: data.id,
        joke: data.value,
        source: "chuck"
    };
}

export async function fetchJoke(): Promise<Joke> {
    if (Math.random() < 0.5) {
        return fetchDadJoke();
    } else {
        return fetchChuckJoke();
    }
}

export async function loadJoke() {
    try {
        const jokeData = await fetchJoke();
        displayJoke(jokeData.joke, jokeData.source);
    } catch (error) {
        console.error(error);
        displayJoke("Error loading joke 😢");
    }
}

export function addReport(joke: string, score: number, source: "dad" | "chuck" = "dad") {
    const existingIndex = reportJokes.findIndex(r => r.joke === joke);
    if (existingIndex !== -1) {
        reportJokes[existingIndex].score = score;
        reportJokes[existingIndex].date = new Date().toISOString();
        reportJokes[existingIndex].source = source;
    } else {
        reportJokes.push({ joke, score, date: new Date().toISOString(), source });
    }
    console.log(reportJokes);
}

export function getReports(): ReportJoke[] {
    return reportJokes;
}