// script.js

// Variables for the game
let initialTime = 15.0; // The starting time for each question
let timeRemaining = initialTime; // Time remaining in the current question
let score = 0;
let timerInterval;
let lastQuestionIndex = -1; // To store the last question index
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// List of questions
const questions = [
    { text: 'The company has a history of inventory shrinkage due to customer theft and damage.', answer: 'Inherent Risk' },
    { text: 'The warehouse lacks a proper inventory tracking system, leading to discrepancies.', answer: 'Control Risk' },
    { text: 'Inventory items are high in value and very specialized, making errors in counting more likely.', answer: 'Inherent Risk' },
    { text: 'The staff responsible for inventory counting are inadequately trained.', answer: 'Control Risk' },
    { text: 'The company has implemented a new inventory management system.', answer: 'Control Risk' },
    { text: 'Certain inventory items are obsolete or slow-moving.', answer: 'Inherent Risk' },
    { text: 'The company handles perishable goods.', answer: 'Inherent Risk' },
    { text: 'Inventory consists of imported goods subject to fluctuating currency exchange rates.', answer: 'Inherent Risk' },
    { text: 'The company operates in a volatile market with fluctuating inventory prices.', answer: 'Inherent Risk' },
    { text: 'The company stores inventory in multiple locations with varying climates.', answer: 'Inherent Risk' },
    { text: 'Inventory includes returned products needing refurbishment.', answer: 'Inherent Risk' },
    { text: 'Inventory includes rare components for specialized machinery.', answer: 'Inherent Risk' },
    { text: 'The company manufactures seasonal goods, leaving unsold items at season end.', answer: 'Inherent Risk' },
    { text: 'Inventory includes hazardous materials requiring special handling.', answer: 'Inherent Risk' },
    { text: 'The company operates in a region prone to natural disasters.', answer: 'Inherent Risk' },
    { text: 'Inventory items are purchased from vendors with long lead times.', answer: 'Inherent Risk' }
];

// HTML elements
const startButton = document.getElementById('start-button');
const inherentRiskButton = document.getElementById('inherent-risk-button');
const controlRiskButton = document.getElementById('control-risk-button');
const retryButton = document.getElementById('retry-button');
const questionDisplay = document.getElementById('question-display');
const timeRemainingDisplay = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const highScoresList = document.getElementById('high-scores');

// Event listeners
startButton.addEventListener('click', startGame);
inherentRiskButton.addEventListener('click', () => checkAnswer('Inherent Risk'));
controlRiskButton.addEventListener('click', () => checkAnswer('Control Risk'));
retryButton.addEventListener('click', restartGame);

// Start the game
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    initialTime = 15.0; // Reset initial time
    timeRemaining = initialTime; // Reset time remaining
    score = 0;
    updateScore();
    displayQuestion();
    startTimer();
}

// Timer functionality
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timeRemainingDisplay.textContent = timeRemaining.toFixed(1); // Display the starting time
    timerInterval = setInterval(() => {
        timeRemaining -= 0.1;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timeRemainingDisplay.textContent = timeRemaining.toFixed(1);
        }
    }, 100); // Update every 100ms
}

// Reset the timer after a correct answer
function resetTimer() {
    clearInterval(timerInterval); // Stop the existing timer
    // Decrease initialTime by 0.5 seconds but not below 1 second
    initialTime = Math.max(1.0, initialTime - 0.5);
    timeRemaining = initialTime; // Reset timeRemaining to the new initialTime
    timeRemainingDisplay.textContent = timeRemaining.toFixed(1); // Update the display
    startTimer(); // Start the timer again
}

// Display a new question
function displayQuestion() {
    let randomIndex;

    // Make sure the new question is not the same as the last one
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (randomIndex === lastQuestionIndex);

    // Set the new question and store the current index as the last one
    const question = questions[randomIndex];
    questionDisplay.textContent = question.text;
    lastQuestionIndex = randomIndex; // Store the last question index
}

// Check if the answer is correct
function checkAnswer(selectedAnswer) {
    const currentQuestionText = questionDisplay.textContent;
    const currentQuestion = questions.find(q => q.text === currentQuestionText);
    const correctAnswer = currentQuestion.answer;

    if (selectedAnswer === correctAnswer) {
        score++;
        updateScore();
        resetTimer(); // Reset the timer with reduced time
        displayQuestion(); // Show the next question
    } else {
        endGame(); // End the game on an incorrect answer
    }
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// End the game
function endGame() {
    clearInterval(timerInterval);
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    finalScoreDisplay.textContent = score;
    saveHighScore(score);
    displayHighScores();
}

// Save high score to local storage
function saveHighScore(score) {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5); // Keep top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Display high scores on the end screen
function displayHighScores() {
    highScoresList.innerHTML = highScores.map(score => `<li>${score}</li>`).join('');
}

// Restart the game
function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    startGame();
}
