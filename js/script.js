const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Africa", correct: false},
            {text: "Europe", correct: false},
            {text: "Asia", correct: false},
            {text: "Australia", correct: true}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Antarctica", correct: true},
            {text: "Sahara", correct: false},
            {text: "Gobi", correct: false},
            {text: "Kalahari", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican city", correct: true},
            {text: "Lesoto", correct: false},
            {text: "Togo", correct: false},
            {text: "Jamaica", correct: false}
        ]
    }
];

const questionCall = document.querySelector(".question");
const answersBtn = document.querySelector(".answers");
const nextBtn = document.querySelector(".next_btn");

let currentQuizIndex = 0;
let score = 0;

function startQuiz() {
    currentQuizIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuiz();
}

function showQuiz() {
    resetState();
    let currentQuiz = questions [currentQuizIndex];
    let questionNo = currentQuizIndex + 1;
    questionCall.innerHTML = questionNo + ". " + currentQuiz.question;

    currentQuiz.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answersBtn.firstChild) {
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionCall.innerHTML = `Your Scored: ${score}/${questions.length}`;
    nextBtn.innerHTML = "Repeat the Quiz";
    nextBtn.style.display = "block";
}

function handleNextbutton() {
    currentQuizIndex++;
    if (currentQuizIndex < questions.length) {
        showQuiz();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener('click', ()=> {
    if (currentQuizIndex < questions.length) {
        handleNextbutton();
    }
    else {
        startQuiz();
    }
})


startQuiz();
