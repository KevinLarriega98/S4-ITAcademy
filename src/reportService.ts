export interface ReportJoke {
    joke: string;
    score: number;
    date: string;
}

export const reportJokes: ReportJoke[] = [];

export function addReport(joke: string, score: number) {
    const existingIndex = reportJokes.findIndex(r => r.joke === joke);

    if (existingIndex !== -1) {
        reportJokes[existingIndex].score = score;
        reportJokes[existingIndex].date = new Date().toISOString();
    } else {
        reportJokes.push({ joke, score, date: new Date().toISOString() });
    }

    console.log(reportJokes);
}