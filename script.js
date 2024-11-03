const questions = [
    { question: "മധുരത്തിൻ്റെ മറ്റൊരു പേര്?", 
        options: ["പെരുംകപ്പ", "തേച്ചിൽ", "പൊന്ന്", "തേൻ"], 
        answer: 1 
    },
    { question: "ചൂട് = --------- ?", 
        options: ["കപ്പ", "കാച്ചി", "കുളി", "മഞ്ഞ"], 
        answer: 1 
    },
    { question: "ചക്ക = --------- ?", 
        options: ["കള", "പക", "കമറ", "കുടം"], 
        answer: 0 
    },
    { question: "ഊട്ട = --------- ?", 
        options: [" ഊട്ടി", "ഓട്ട", "തൊള", "പൊത്ത്"], 
        answer: [1, 2, 3] 
    },
    { question: "പപ്പനാഭൻ്റെ നാട്?", 
        options: ["കണ്ണൂർ", "തൃശൂർ", "തിരുവനന്തപുരം", "കൊല്ലം"], 
        answer: 2 
    },
    { question: "നീല വർണ്ണം എന്തിന് ?", 
        options: ["നദി", "ആകാശം", "സമുദ്രം", "പർവതം"], 
        answer: 1 
    },
    { question: "പൂമ്പാറ്റയുടെ നിറം?", 
        options: ["ചുവപ്പ്", "പച്ച", "നീല", "പിങ്ക്"], 
        answer: 3 
    },
    { question: "ചന്ദ്രന്റെ പ്രകാശം?", 
        options: ["വെള്ള", "പച്ച", "മഞ്ഞ", "വെളുപ്പ്"], 
        answer: 3 
    },
    { question: "പകർച്ച?", 
        options: ["താമസിക്ക", "ഇല", "കാണുക", "മാറ്റം"], 
        answer: 2 
    },
    { question: "വേനൽ എന്നാൽ ഏത് കാലാവസ്ഥയാണ്?", 
        options: ["മഞ്ഞുകാലം","മഴക്കാലം","തണുപ്പുകാലം","ചൂട് കാലം"], 
        answer: 3 
    }
];

let score = 0;
let incorrectAnswers = [];
let selectedQuestions = [];
let currentQuestion = null;

function initializeQuiz() {
    score = 0;
    incorrectAnswers = [];
    selectedQuestions = getRandomQuestions(5);  // Pick 5 random questions
    loadQuestion();
}

function getRandomQuestions(count) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function loadQuestion() {
    if (selectedQuestions.length === 0) {
        displayResult();
        return;
    }

    const randomIndex = Math.floor(Math.random() * selectedQuestions.length);
    currentQuestion = selectedQuestions[randomIndex];
    selectedQuestions.splice(randomIndex, 1);

    document.getElementById("question-box").innerText = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
        const cloudElement = document.getElementById("cloud-" + index);
        if (cloudElement) {
            cloudElement.innerText = option;
            cloudElement.style.display = "block"; // Ensure options are visible
        }
    });
}

function selectOption(index) {
    if (Array.isArray(currentQuestion.answer)) {
        if (currentQuestion.answer.includes(index)) {
            score++;
        } else {
            incorrectAnswers.push({
                question: currentQuestion.question,
                incorrectAnswer: currentQuestion.options[index],
                correctAnswer: currentQuestion.options
                    .filter((_, i) => currentQuestion.answer.includes(i))
                    .join(", ")
            });
        }
    } else {
        if (index === currentQuestion.answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: currentQuestion.question,
                incorrectAnswer: currentQuestion.options[index],
                correctAnswer: currentQuestion.options[currentQuestion.answer]
            });
        }
    }
    loadQuestion();
}

function displayResult() {
    document.getElementById("results").style.display = "block";

    if (score === 5) {
        document.getElementById("final-score").innerText = "Yeay.. you got all the answers!";
    } else {
        document.getElementById("final-score").innerText = `You scored ${score} out of 5!`;
    }

    // Hide question and options
    document.getElementById("question-box").style.display = "none";
    for (let i = 0; i < 4; i++) {
        document.getElementById("cloud-" + i).style.display = "none";
    }
}

function retryQuiz() {
    document.getElementById("results").style.display = "none";
    document.getElementById("question-box").style.display = "block";
    for (let i = 0; i < 4; i++) {
        document.getElementById("cloud-" + i).style.display = "block";
    }
    initializeQuiz();
}

function showAnswers() {
    let incorrectAnswersHtml = "";
    incorrectAnswers.forEach(answer => {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${answer.question}<br>
                <strong>Your Answer:</strong> ${answer.incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${answer.correctAnswer}
            </p>
        `;
    });

    document.getElementById("final-score").innerHTML += `
        <h3>Incorrect Answers:</h3>
        ${incorrectAnswersHtml}
    `;
}

window.onload = initializeQuiz;
