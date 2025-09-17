import { addReport } from "../services/jokeService.js";
const jokeEl = document.getElementById("joke");
const scoreButtons = [1, 2, 3].map((n) => document.getElementById(`score${n}`));
export function displayJoke(joke) {
    jokeEl.textContent = joke;
}
export function setupScoreButtons() {
    scoreButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const score = index + 1;
            addReport(jokeEl.textContent, score);
        });
    });
}
