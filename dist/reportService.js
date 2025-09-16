export const reportJokes = [];
export function addReport(joke, score) {
    const existingIndex = reportJokes.findIndex(r => r.joke === joke);
    if (existingIndex !== -1) {
        reportJokes[existingIndex].score = score;
        reportJokes[existingIndex].date = new Date().toISOString();
    }
    else {
        reportJokes.push({ joke, score, date: new Date().toISOString() });
    }
    console.log(reportJokes);
}
