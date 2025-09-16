import { getJoke } from "./apiService.js";
import { displayJoke, setupScoreButtons } from "./uiService.js";

async function loadJoke() {
    try {
        const jokeData = await getJoke();
        displayJoke(jokeData.joke);
    } catch (error) {
        console.error(error);
        displayJoke("Error loading joke 😢");
    }
}

setupScoreButtons();

document.getElementById("nextJoke")!.addEventListener("click", loadJoke);

loadJoke();