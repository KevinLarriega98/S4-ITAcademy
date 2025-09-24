var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchApi } from "../services/apiService";
import { WEATHER_API } from "../config/config";
describe("getWeather real function test", () => {
    test("fetches the weather for Barcelona", () => __awaiter(void 0, void 0, void 0, function* () {
        const latitude = 41.3874;
        const longitude = 2.1686;
        const url = `${WEATHER_API.url}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const data = yield fetchApi(url);
        expect(data).toHaveProperty("current_weather");
        expect(data.current_weather).toHaveProperty("temperature");
        expect(typeof data.current_weather.temperature).toBe("number");
        expect(data.current_weather).toHaveProperty("weathercode");
        expect(typeof data.current_weather.weathercode).toBe("number");
    }));
});
