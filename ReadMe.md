# 🎯 QuizMaster - Interactive Quiz Application

**An engaging Node.js-powered trivia web application where users can attempt questions, validate answers, and contribute new quiz questions dynamically.**  

---

## 📌 Table of Contents  

- [🚀 Overview](#-overview)  
- [📂 Directory Structure](#-directory-structure)  
- [🔧 Features](#-features)  
- [⚙️ Installation & Setup](#️-installation--setup)  
- [🏃 Running the Application](#-running-the-application)  
- [📝 API Endpoints](#-api-endpoints)  
- [🖥️ Example Usage](#️-example-usage)  
- [🔍 Testing & Linting](#-testing--linting)  
- [📌 Future Enhancements](#-future-enhancements)  
- [📜 License](#-license)  

---

## 🚀 Overview  

**QuizMaster** is a fun and interactive trivia application that allows users to:  

✔️ Attempt random quiz questions and submit answers.  
✔️ Get instant feedback on correct and incorrect answers.  
✔️ Add new trivia questions with multiple correct answers.  
✔️ Browse a growing database of trivia questions.  

Built with **Node.js, Express.js, and Handlebars.js**, QuizMaster dynamically manages trivia data through an in-memory store.  

---

## 📂 Directory Structure  

```
QuizMaster/
├── app.mjs                     # Main server logic
├── query.mjs                    # Query class to manage quiz questions
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
├── code-samples/
│   └── question-bank.json       # Initial question bank
├── public/                      # Static assets
│   ├── css/
│   │   └── main.css             # Stylesheets
│   └── img/
│       └── logo.png             # Logo for the app
├── views/                       # Handlebars templates
│   ├── layout.hbs               # Main layout file
│   ├── quiz.hbs                 # Quiz interface
│   ├── questions.hbs            # All questions page
│   └── any additional hbs files
├── .gitignore                   # Ignored files (node_modules, etc.)
└── README.md                    # Documentation
```

---

## 🔧 Features  

✅ **Randomized Quiz Interface** – Displays a random question with an interactive input field.  
✅ **Real-Time Answer Validation** – Highlights correct answers in green and incorrect ones in red.  
✅ **User-Contributed Questions** – Users can browse and add new trivia questions.  
✅ **Session Management** – Stores user quiz progress dynamically.  
✅ **Robust Middleware Logging** – Logs request method, path, and query parameters.  
✅ **Form Handling (GET & POST)** – Securely submits and retrieves user responses.  

---

## ⚙️ Installation & Setup  

### 1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/QuizMaster.git
cd QuizMaster
```

### 2️⃣ **Install Dependencies**  
```bash
npm install
```

### 3️⃣ **Set Up Configuration**  
Ensure **Node.js** is installed. The app will serve static files and use an in-memory trivia database.  

---

## 🏃 Running the Application  

### **Start the Server**  
```bash
node app.mjs
```
Your application will now be available at:  

🔗 **http://localhost:3000**  

### **Enable Development Mode (Optional)**  
Use **nodemon** for automatic server restarts:  
```bash
npm install -g nodemon
nodemon app.mjs
```

---

## 📝 API Endpoints  

| Endpoint      | Method | Description |
|--------------|--------|-------------|
| `/`          | GET    | Redirects to `/quiz` |
| `/quiz`      | GET    | Displays a random trivia question |
| `/quiz`      | POST   | Processes user answer and provides feedback |
| `/questions` | GET    | Shows all available questions |
| `/questions` | POST   | Allows users to add new questions |

---

## 🖥️ Example Usage  

### **1️⃣ Answering a Trivia Question**  
- Visit `/quiz`.  
- A random question is displayed with an input field.  
- Enter an answer and submit.  
- Correct answers turn **green**, incorrect ones turn **red**.  

### **2️⃣ Browsing Questions**  
- Navigate to `/questions`.  
- See a list of all available trivia questions.  

### **3️⃣ Adding a New Question**  
- Go to `/questions`.  
- Fill in the question, genre, and correct answers.  
- Submit to add it to the question bank.  

---

## 🔍 Testing & Linting  

### **Run Unit Tests**  
```bash
npx mocha tests/app-test.mjs
```

### **Check Code with ESLint**  
```bash
npx eslint app.mjs
```
To automatically fix errors:  
```bash
npx eslint app.mjs --fix
```

---

## 📌 Future Enhancements  

🔜 **Database Integration** – Store questions in MongoDB/PostgreSQL instead of an in-memory array.  
🔜 **User Authentication** – Allow users to track quiz progress via login.  
🔜 **Difficulty Levels** – Categorize questions based on complexity.  
🔜 **Leaderboard** – Display top quiz performers.  
🔜 **Public API** – Provide a REST API to fetch trivia questions.  

---

## 📜 License  

This project is licensed under the **MIT License** – feel free to modify and expand it!  