import { displayJoke } from "../ui/uiService.js";
import { DAD_JOKE_API, CHUCK_NORRIS_API } from "../config/config.js";
import { fetchApi } from "./apiService.js";

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
    const data = await fetchApi<{ id: string; joke: string }>(DAD_JOKE_API, {
        headers: {
            Accept: "application/json",
        },
    });
    return {
        id: data.id,
        joke: data.joke,
        source: "dad"
    };
}

async function fetchChuckJoke(): Promise<Joke> {
    const data = await fetchApi<{ id: string; value: string }>(CHUCK_NORRIS_API);
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