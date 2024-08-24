const gameContainer = document.getElementById('gameContainer');
const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');

const gameHeight = gameContainer.clientHeight;
const gameWidth = gameContainer.clientWidth;
const paddleHeight = playerPaddle.clientHeight;
const ballSize = ball.clientWidth;

let playerPaddleY = (gameHeight - paddleHeight) / 2;
let computerPaddleY = (gameHeight - paddleHeight) / 2;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerScore = 0;
let computerScore = 0;
const paddleSpeed = 10;
const computerSpeed = 3;

function updateGame() {
    // Move Ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY + ballSize >= gameHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= playerPaddle.offsetLeft + playerPaddle.clientWidth && ballY + ballSize >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize >= computerPaddle.offsetLeft && ballY + ballSize >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX <= 0) {
        computerScore++;
        resetBall();
    }

    if (ballX + ballSize >= gameWidth) {
        playerScore++;
        resetBall();
    }

    // Move Computer Paddle
    if (ballY < computerPaddleY + paddleHeight / 2) {
        computerPaddleY -= computerSpeed;
    } else {
        computerPaddleY += computerSpeed;
    }

    // Boundaries for Computer Paddle
    if (computerPaddleY <= 0) {
        computerPaddleY = 0;
    }

    if (computerPaddleY + paddleHeight >= gameHeight) {
        computerPaddleY = gameHeight - paddleHeight;
    }

    // Update Positions
    playerPaddle.style.top = `${playerPaddleY}px`;
    computerPaddle.style.top = `${computerPaddleY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function resetBall() {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4;
}

function keyDownHandler(e) {
    if (e.key === "ArrowUp") {
        playerPaddleY = Math.max(playerPaddleY - paddleSpeed, 0);
    } else if (e.key === "ArrowDown") {
        playerPaddleY = Math.min(playerPaddleY + paddleSpeed, gameHeight - paddleHeight);
    }
}

document.addEventListener('keydown', keyDownHandler);

setInterval(updateGame, 1000 / 60);
