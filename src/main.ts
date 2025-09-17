import { loadJoke } from "./services/jokeService.js";
import { setupScoreButtons } from "./ui/uiService.js";
import { loadWeather } from "./services/weatherService.js";

setupScoreButtons();

document.getElementById("nextJoke")!.addEventListener("click", loadJoke);

loadJoke();
loadWeather();