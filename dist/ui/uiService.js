import { addReport } from "../services/jokeService.js";
import { getReports } from "../services/jokeService.js";
export function renderReportHistory() {
    const historyEl = document.getElementById("reportHistory");
    const reports = getReports();
    historyEl.innerHTML = "";
    if (reports.length === 0) {
        historyEl.innerHTML = `<li class="list-group-item">No jokes rated yet.</li>`;
        return;
    }
    reports.forEach((report) => {
        const sourceLabel = report.source === "dad" ? "Dad Joke" : "Chuck Norris";
        historyEl.innerHTML +=
            `<li class="list-group-item">
                <strong>${sourceLabel}:</strong> ${report.joke}<br>
                <strong>Score:</strong> ${report.score}
            </li>`;
    });
}
const jokeEl = document.getElementById("joke");
const jokeSourceEl = document.getElementById("jokeSource");
const scoreButtons = [1, 2, 3].map((n) => document.getElementById(`score${n}`));
let lastJokeSource = "dad";
export function displayJoke(joke, source) {
    jokeEl.textContent = joke;
    if (source) {
        jokeSourceEl.textContent = source === "dad" ? "Dad Joke" : "Chuck Norris";
        lastJokeSource = source;
    }
    else {
        jokeSourceEl.textContent = "";
        lastJokeSource = "dad";
    }
}
export function setupScoreButtons() {
    scoreButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const score = index + 1;
            addReport(jokeEl.textContent, score, lastJokeSource);
            renderReportHistory();
        });
    });
}
