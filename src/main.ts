import { loadJoke } from "./services/jokeService";
import { setupScoreButtons, renderReportHistory } from "./ui/uiService";
import { loadWeather } from "./services/weatherService";

setupScoreButtons();
renderReportHistory();

document.getElementById("nextJoke")!.addEventListener("click", loadJoke);

loadJoke();
loadWeather();