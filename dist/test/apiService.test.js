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
import { DAD_JOKE_API, CHUCK_NORRIS_API, WEATHER_API } from "../config/config";
describe("fetchApi real API connections", () => {
    test("connects successfully to Dad Joke API", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetchApi(DAD_JOKE_API.url, DAD_JOKE_API.options);
        expect(data).toHaveProperty("joke");
        expect(typeof data.joke).toBe("string");
    }));
    test("connects successfully to Chuck Norris API", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetchApi(CHUCK_NORRIS_API.url);
        expect(data).toHaveProperty("value");
        expect(typeof data.value).toBe("string");
    }));
    test("connects successfully to Weather API (Barcelona)", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${WEATHER_API.url}?latitude=41.3874&longitude=2.1686&current_weather=true`;
        const data = yield fetchApi(url);
        expect(data).toHaveProperty("current_weather");
        expect(data.current_weather).toHaveProperty("temperature");
        expect(typeof data.current_weather.temperature).toBe("number");
    }));
});
