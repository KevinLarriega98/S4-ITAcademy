var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { displayJoke } from "../ui/uiService.js";
import { DAD_JOKE_API, CHUCK_NORRIS_API } from "../config/config.js";
import { fetchApi } from "./apiService.js";
const reportJokes = [];
function dataParser(data, source) {
    const jokeText = source === "dad" ? data.joke : data.value;
    return {
        id: data.id,
        joke: jokeText,
        source
    };
}
export function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const isDad = Math.random() < 0.5;
        const data = yield fetchApi(isDad ? DAD_JOKE_API.url : CHUCK_NORRIS_API.url, isDad ? DAD_JOKE_API.options : undefined);
        return dataParser(data, isDad ? "dad" : "chuck");
    });
}
export function loadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeData = yield fetchJoke();
            displayJoke(jokeData.joke, jokeData.source);
        }
        catch (error) {
            console.error(error);
            displayJoke("Error loading joke 😢");
        }
    });
}
export function addReport(joke, score, source = "dad") {
    const existingIndex = reportJokes.findIndex(r => r.joke === joke);
    if (existingIndex !== -1) {
        reportJokes[existingIndex].score = score;
        reportJokes[existingIndex].date = new Date().toISOString();
        reportJokes[existingIndex].source = source;
    }
    else {
        reportJokes.push({ joke, score, date: new Date().toISOString(), source });
    }
    console.log(reportJokes);
}
export function getReports() {
    return reportJokes;
}
