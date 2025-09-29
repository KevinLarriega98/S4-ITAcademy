# 🎯 Sprint 4 – TypeScript & API Integration  

A small productivity web app built with **TypeScript**, designed to start the day with a joke and live weather info.  
This project is part of the IT Academy Bootcamp – Sprint 4.  

---

## 🧩 Description  

The app:  
- Fetches **random jokes** from different APIs.  
- Displays the **current weather** based on user location.  
- Lets users **rate jokes** (1–3).  
- Shows a report with all rated jokes.  

It was developed to practice **TypeScript**, **API consumption**, and **clean modular architecture**.  

---

## ✨ Features  

- 🎲 Random jokes from multiple APIs.  
- 🌦️ Real-time weather info via geolocation.  
- ⭐ Joke rating system with history.  
- 🧱 Modular services: `apiService`, `jokeService`, `weatherService`.  
- 🧪 Unit testing with Jest.  

---

## 🔧 Tech Stack  

- **TypeScript**  
- **HTML5 / CSS3**  
- **Jest** (unit tests)  
- **Public APIs**: Jokes & Weather  

---

## 📁 Project Structure

```plaintext
Sprint 4/
├── dist/                  # Compiled JavaScript (from TypeScript)
│   └── main.js
├── src/
│   ├── config/             # API keys, constants
│   ├── services/           # API, joke & weather logic
│   ├── ui/                 # DOM/UI functions
│   ├── test/               # Jest unit tests
│   ├── main.css
│   └── main.ts             # Entry point (compiled into dist/main.js)
├── index.html              # References dist/main.js
├── jest.config.ts
├── tsconfig.json
├── package.json
```

---

## ▶️ Getting Started

### Installation

```bash
git clone https://github.com/KevinLarriega98/S4-ITAcademy.git
cd S4-ITAcademy
npm install
```

### Running the Project

Since the project is written in TypeScript, you need to compile it into JavaScript before running.

1. Compile TypeScript:
```bash
npx tsc
```
This will generate the `/dist` folder with the compiled `.js` files.

2. Since the APIs can trigger **CORS errors**, the project is best run using the **Live Server** extension in VS Code (or any simple static server).
- Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
- In the bottom-right corner of VS Code, click the **Go Live** button.
- A new browser tab will open automatically and the project will start running.

### Running Tests

```bash
npm test
```

---

## 🌍 APIs Used

- [`icanhazdadjoke`](https://icanhazdadjoke.com/) - Dad jokes.
- [`Chuck Norris API`](https://api.chucknorris.io/) - Chuck Norris jokes.
- [`Open-Meteo`](https://open-meteo.com/) - Weather data.