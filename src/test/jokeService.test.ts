import { fetchJoke, addReport, getReports } from "../services/jokeService"

describe("fetchJoke real function tests", () => {
    test("fetches either a Dad or Chuck Norris joke", async () => {
        const jokeData = await fetchJoke()
        expect(["dad", "chuck"]).toContain(jokeData.source)
        expect(typeof jokeData.joke).toBe("string")
    })
})

describe("score system tests", () => {
    beforeEach(() => {
        getReports().length = 0
    })

    test("adds a new report correctly", () => {
        addReport("My joke", 2, "dad")
        const reports = getReports()
        expect(reports).toHaveLength(1)
        expect(reports[0]).toEqual(expect.objectContaining({
            joke: "My joke",
            score: 2,
            source: "dad"
        }))
    })

    test("updates an existing report", () => {
        addReport("My joke", 2, "dad")
        addReport("My joke", 3, "dad")
        const reports = getReports()
        expect(reports).toHaveLength(1)
        expect(reports[0].score).toBe(3)
    })

    test("adds multiple reports", () => {
        addReport("Joke 1", 1, "dad")
        addReport("Joke 2", 2, "chuck")
        const reports = getReports()
        expect(reports).toHaveLength(2)
        expect(reports.map(r => r.joke)).toEqual(["Joke 1", "Joke 2"])
    })
})