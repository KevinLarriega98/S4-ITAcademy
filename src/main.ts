import { loadJoke } from "./services/jokeService.js";
import { setupScoreButtons, renderReportHistory } from "./ui/uiService.js";
import { loadWeather } from "./services/weatherService.js";

setupScoreButtons();
renderReportHistory();

document.getElementById("nextJoke")!.addEventListener("click", loadJoke);

loadJoke();
loadWeather();