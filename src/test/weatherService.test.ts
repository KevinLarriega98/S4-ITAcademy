import { fetchApi } from "../services/apiService";
import { WEATHER_API } from "../config/config";

describe("getWeather real function test", () => {
    test("fetches the weather for Barcelona", async () => {
        const latitude = 41.3874
        const longitude = 2.1686

        const url = `${WEATHER_API.url}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        const data = await fetchApi<any>(url)

        expect(data).toHaveProperty("current_weather")
        expect(data.current_weather).toHaveProperty("temperature")
        expect(typeof data.current_weather.temperature).toBe("number")
        expect(data.current_weather).toHaveProperty("weathercode")
        expect(typeof data.current_weather.weathercode).toBe("number")
    });
});