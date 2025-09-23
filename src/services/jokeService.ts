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

function dataParser(data: any, source: "dad" | "chuck"): Joke {
    const jokeText = source === "dad" ? data.joke : data.value;

    return {
        id: data.id,
        joke: jokeText,
        source
    };
}

export async function fetchJoke(): Promise<Joke> {
    const isDad = Math.random() < 0.5;

    const data = await fetchApi<any>(
        isDad ? DAD_JOKE_API.url : CHUCK_NORRIS_API.url,
        isDad ? DAD_JOKE_API.options : undefined
    );

    return dataParser(data, isDad ? "dad" : "chuck");
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