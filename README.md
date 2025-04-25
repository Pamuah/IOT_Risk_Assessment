# 🛡️ P-SIRM2 Tool

A web-based tool for assessing and visualizing IoT-related risks using real-time data. Built with modern technologies including Next.js, TypeScript, Axios, and Chart.js.

## 🚀 Features

- ✅ Perform IoT risk assessments through an intuitive interface
- 📈 Interactive charts for visualizing risk levels
- 🔄 Real-time data fetching using Axios
- ⚡ Fast and scalable with Next.js and TypeScript

## 🧰 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)

## 🖼️ Screenshots

<!-- Add your screenshots here -->
![Dashboard Screenshot](./screenshots/dashboard.png)

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/risk-iot-tool.git
cd risk-iot-tool
npm install
```
To run the development environment

```bash
npm run dev
```

### Folder Structure
my-next-app/
├── public/
├── src/
      ├── components
      ├── GlobalContext
      ├── ApiServices
      ├── Users
      
├── package.json/
        
├── tsconfig.json
└── next.config.js

### How It Works

Data is fetched from IoT APIs via the backend

Risks are calculated and processed in the backend 

The processed data is then retrieved by the frontend with axios

The frontend with Chart.js displays the processed risk data in an interactive visual format

after interactions are made the changed data is made available to the backend for storage 

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

👨‍💻 Author
Patrick Amuah
patrickamuah38@gmail.com

