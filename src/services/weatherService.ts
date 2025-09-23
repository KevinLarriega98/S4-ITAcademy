import { fetchApi } from "./apiService.js";
import { WEATHER_API } from "../config/config.js";

export interface Weather {
    temperature: number;
    unit: string;
    icon: string;
}

function mapWeatherCodeToIcon(code: number): string {
    if (code === 0) return "☀️";
    if ([1, 2, 3].some(n => n === code)) return "🌤️";
    if ([45, 48].some(n => n === code)) return "🌫️";
    if ([51, 53, 55].some(n => n === code)) return "🌦️";
    if ([61, 63, 65].some(n => n === code)) return "🌧️";
    if ([71, 73, 75].some(n => n === code)) return "🌨️";
    if ([95].some(n => n === code)) return "⛈️";
    return "❓";
}

export async function getLocation(): Promise<{ latitude: number; longitude: number }> {
    if (!navigator.geolocation) {
        throw new Error("Geolocation not supported");
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }),
            (error) => reject(error)
        );
    });
}

export async function getWeather(): Promise<Weather> {
    try {
        const { latitude, longitude } = await getLocation();

        const url = `${WEATHER_API.url}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const data = await fetchApi<any>(url);

        const { temperature, weathercode } = data.current_weather;
        const degrees = data.current_weather_units.temperature;

        return {
            temperature,
            unit: degrees,
            icon: mapWeatherCodeToIcon(weathercode),
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

export async function loadWeather() {
    const weatherEl = document.getElementById("weather")!;
    
    try {
        const weather = await getWeather();
        weatherEl.textContent = `${weather.icon} | ${weather.temperature} ${weather.unit}`;
    } catch {
        weatherEl.textContent = "Error loading weather";
    }
}