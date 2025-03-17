// app.mjs
import express from 'express';
import path from 'path';
import url from 'url';
import {Query} from './query.mjs';
import fs from 'fs';

export let server = null;
export const app = express();

// Implement the decorate function
export const decorate = (answer, correct) => {
    return correct
        ? `<span class="correct-answer">${answer}</span>`
        : `<span class="incorrect-answer">${answer}</span>`;
};

// Continue with the rest of the code
const __filename = path.dirname(url.fileURLToPath(import.meta.url));
const __dirname = path.resolve(__filename, "public");
app.use(express.static(__dirname));

app.set('view engine', 'hbs');
app.set('views', path.join(__filename, 'views'));

export let queries = [];

app.get('/', function(req, res){
    res.redirect('/quiz');
});

app.get('/quiz', (req, res) => {
    if (queries.length === 0) {
        return res.render('quiz', { question: null, userAnswer: '' });
    }
    const randomIndex = Math.floor(Math.random() * queries.length);
    const selectedQuestion = queries[randomIndex];
    console.log(selectedQuestion,"select");
    res.render('quiz', { question: selectedQuestion, userAnswer: '' });
});

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`Query:`, req.query);
    next();
});


fs.readFile('./code-samples/question-bank.json', 'utf-8', (err, data)=>{
    if (err){
        return;
    }
    const questions = JSON.parse(data);
    queries = questions.map(q => new Query(q.question, q.genre, q.answers));
    console.log(queries);

    server = app.listen(3000,()=>{
        console.log("Server started; type CTRL+C to shut down");
    });
});

app.get('/questions', (req, res) => {
    const searched = req.query.search ? req.query.search.toLowerCase() : '';
    const filtered = queries.filter(q => 
        q.question.toLowerCase().includes(searched) ||
        q.genre.toLowerCase().includes(searched) ||
        (Array.isArray(q.answers) 
            ? q.answers.some(answer => answer.toLowerCase().includes(searched)) 
            : q.answers.split(',').some(answer => answer.trim().toLowerCase().includes(searched)))
    );
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`Query:`, req.query);
    console.log("Filtered Questions:", filtered);
    res.render('questions', { queries: filtered, searched });
});


app.post('/questions', (req, res)=>{
    console.log("REQUEST", req.body)
    const { question, genre,  answers} = req.body;
    if (!question || !genre || !answers) {
        return res.redirect('/questions');
    }

    const ans = answers.split(',').map(answrer => answer.trim()).join(', ');
    const newQuery = new Query(question, genre, ans);
    queries.push(newQuery);
    res.redirect('/questions');
});

app.post('/quiz', (req, res) => {
    const { id, answer } = req.body;
    const selectedQuestion = queries.find(q => q.id === id);
    if (!selectedQuestion) {
        return res.redirect('/quiz');
    }

    const userAnswers = answer.split(',').map(a => a.trim().toLowerCase());
    const correctAnswers = Array.isArray(selectedQuestion.answers)
        ? selectedQuestion.answers.map(a => a.toLowerCase())
        : selectedQuestion.answers.split(',').map(a => a.trim().toLowerCase());

    let correctCount = 0;
    let incorrectCount = 0;
    const uniqueCorrectCount = new Set();

    const decoratedAnswers = userAnswers.map(ans => {
        if (correctAnswers.includes(ans)) {
            uniqueCorrectCount.add(ans);
            correctCount++;
            return decorate(ans, true);
        } else {
            incorrectCount++;
            return decorate(ans, false);
        }
    });

    let result = "Incorrect!";
    if (correctCount > 0 && incorrectCount > 0) {
        result = "Partially Correct. Almost There! 😬";
    } else if (uniqueCorrectCount.size === correctAnswers.length && incorrectCount === 0) {
        result = "Correct!";
    } else if (uniqueCorrectCount.size > 0) {
        result = "Partially Correct. Almost There! 😬";
    }

    res.render('quiz', {
        question: selectedQuestion,
        userAnswer: answer,
        correction: decoratedAnswers.join(', '),
        result
    });
});
