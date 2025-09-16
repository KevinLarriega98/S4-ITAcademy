import { getJoke, Joke } from "./apiService.js";

async function loadJoke() {
    try {
        const jokeData: Joke = await getJoke();
        document.getElementById("joke")!.textContent = jokeData.joke;
    } catch (error) {
        console.error(error);
        document.getElementById("joke")!.textContent = "Error loading joke";
    }
}

document.getElementById("nextJoke")!
    .addEventListener("click", loadJoke);

loadJoke();