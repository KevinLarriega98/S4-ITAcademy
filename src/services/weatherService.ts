export interface Weather {
    temperature: number;
    unit: string,
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

export async function getWeather(): Promise<Weather> {
    const latitude = 41.3851;
    const longitude = 2.1734;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching weather");

    const data = await response.json();
    
    const { temperature, weathercode } = data.current_weather;
    const degrees = data.current_weather_units.temperature;

    return {
        temperature,
        unit: degrees,
        icon: mapWeatherCodeToIcon(weathercode),
    };
}

export async function loadWeather() {
    const weatherEl = document.getElementById("weather")!;

    try {
        const weather = await getWeather();
        weatherEl.textContent = `${weather.icon} | ${weather.temperature} ${weather.unit}`;
    } catch (error) {
        console.log(error);
        weatherEl.textContent = "Error loading weather";
    }
}