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
const reportJokes = [];
function fetchDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(DAD_JOKE_API, {
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok)
            throw new Error("Error fetching dad joke");
        const data = yield response.json();
        return {
            id: data.id,
            joke: data.joke,
            source: "dad"
        };
    });
}
function fetchChuckJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(CHUCK_NORRIS_API);
        if (!response.ok)
            throw new Error("Error fetching chuck norris joke");
        const data = yield response.json();
        return {
            id: data.id,
            joke: data.value,
            source: "chuck"
        };
    });
}
export function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        if (Math.random() < 0.5) {
            return fetchDadJoke();
        }
        else {
            return fetchChuckJoke();
        }
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
