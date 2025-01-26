// This file contains the JavaScript code that implements the game logic for the Snake game.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');

const unitSize = 20; // Change unit size to 20x20

let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let direction = { x: 0, y: 0 };
let fruit = { x: 0, y: 0 };
let score = 0;
let speed = 100;
let highscore = localStorage.getItem('highscore') || 0;

highscoreDisplay.textContent = 'Highscore: ' + highscore;

function init() {
    placeFruit();
    document.addEventListener('keydown', changeDirection);
    setInterval(update, speed);
}

function placeFruit() {
    fruit.x = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    fruit.y = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -unitSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: unitSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -unitSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: unitSize, y: 0 };
            break;
    }
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        placeFruit();
        speed = Math.max(50, speed - 5); // Increase speed
    } else {
        snake.pop(); // Remove the tail
    }

    snake.unshift(head); // Add new head

    if (checkCollision(head)) {
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore);
            highscoreDisplay.textContent = 'Highscore: ' + highscore;
        }
        alert('Game Over! Your score: ' + score);
        resetGame();
    }

    draw();
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
    });

    // Draw fruit
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, unitSize, unitSize);
}

function resetGame() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    speed = 100;
    placeFruit();
}

init();