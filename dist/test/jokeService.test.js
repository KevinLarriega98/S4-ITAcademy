var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchJoke, addReport, getReports } from "../services/jokeService";
describe("fetchJoke real function tests", () => {
    test("fetches either a Dad or Chuck Norris joke", () => __awaiter(void 0, void 0, void 0, function* () {
        const jokeData = yield fetchJoke();
        expect(["dad", "chuck"]).toContain(jokeData.source);
        expect(typeof jokeData.joke).toBe("string");
    }));
});
describe("score system tests", () => {
    beforeEach(() => {
        getReports().length = 0;
    });
    test("adds a new report correctly", () => {
        addReport("My joke", 2, "dad");
        const reports = getReports();
        expect(reports).toHaveLength(1);
        expect(reports[0]).toEqual(expect.objectContaining({
            joke: "My joke",
            score: 2,
            source: "dad"
        }));
    });
    test("updates an existing report", () => {
        addReport("My joke", 2, "dad");
        addReport("My joke", 3, "dad");
        const reports = getReports();
        expect(reports).toHaveLength(1);
        expect(reports[0].score).toBe(3);
    });
    test("adds multiple reports", () => {
        addReport("Joke 1", 1, "dad");
        addReport("Joke 2", 2, "chuck");
        const reports = getReports();
        expect(reports).toHaveLength(2);
        expect(reports.map(r => r.joke)).toEqual(["Joke 1", "Joke 2"]);
    });
});
