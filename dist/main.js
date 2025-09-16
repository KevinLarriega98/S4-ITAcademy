var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getJoke } from "./apiService.js";
function loadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeData = yield getJoke();
            document.getElementById("joke").textContent = jokeData.joke;
        }
        catch (error) {
            console.error(error);
            document.getElementById("joke").textContent = "Error loading joke";
        }
    });
}
document.getElementById("nextJoke")
    .addEventListener("click", loadJoke);
loadJoke();
