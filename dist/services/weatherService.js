var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchApi } from "./apiService";
import { WEATHER_API } from "../config/config";
function mapWeatherCodeToIcon(code) {
    if (code === 0)
        return "☀️";
    if ([1, 2, 3].some(n => n === code))
        return "🌤️";
    if ([45, 48].some(n => n === code))
        return "🌫️";
    if ([51, 53, 55].some(n => n === code))
        return "🌦️";
    if ([61, 63, 65].some(n => n === code))
        return "🌧️";
    if ([71, 73, 75].some(n => n === code))
        return "🌨️";
    if ([95].some(n => n === code))
        return "⛈️";
    return "❓";
}
export function getLocation() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.geolocation) {
            throw new Error("Geolocation not supported");
        }
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }), (error) => reject(error));
        });
    });
}
export function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { latitude, longitude } = yield getLocation();
            const url = `${WEATHER_API.url}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const data = yield fetchApi(url);
            const { temperature, weathercode } = data.current_weather;
            const degrees = data.current_weather_units.temperature;
            return {
                temperature,
                unit: degrees,
                icon: mapWeatherCodeToIcon(weathercode),
            };
        }
        catch (error) {
            console.error("Error fetching weather:", error);
            throw error;
        }
    });
}
export function loadWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherEl = document.getElementById("weather");
        try {
            const weather = yield getWeather();
            weatherEl.textContent = `${weather.icon} | ${weather.temperature} ${weather.unit}`;
        }
        catch (_a) {
            weatherEl.textContent = "Error loading weather";
        }
    });
}
