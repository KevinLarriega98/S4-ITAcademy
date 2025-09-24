import { fetchApi } from "../services/apiService"
import { DAD_JOKE_API, CHUCK_NORRIS_API, WEATHER_API } from "../config/config"

describe("fetchApi real API connections", () => {
    test("connects successfully to Dad Joke API", async () => {
        const data = await fetchApi<any>(DAD_JOKE_API.url, DAD_JOKE_API.options)
        expect(data).toHaveProperty("joke")
        expect(typeof data.joke).toBe("string")
    })

    test("connects successfully to Chuck Norris API", async () => {
        const data = await fetchApi<any>(CHUCK_NORRIS_API.url)
        expect(data).toHaveProperty("value")
        expect(typeof data.value).toBe("string")
    })

    test("connects successfully to Weather API (Barcelona)", async () => {
        const url = `${WEATHER_API.url}?latitude=41.3874&longitude=2.1686&current_weather=true`
        const data = await fetchApi<any>(url)

        expect(data).toHaveProperty("current_weather")
        expect(data.current_weather).toHaveProperty("temperature")
        expect(typeof data.current_weather.temperature).toBe("number")
    })
})