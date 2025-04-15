const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let dx = gridSize;
let dy = 0;
let food = {};
let score = 0;

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, gridSize, gridSize);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Your Score: " + score);
    document.location.reload();
    return;
  }

  snake.unshift(head);

  // If snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    placeFood();
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw food
  drawRect(food.x, food.y, "red");

  // Draw snake
  snake.forEach((segment, index) =>
    drawRect(segment.x, segment.y, index === 0 ? "lime" : "green")
  );
}

function gameLoop() {
  moveSnake();
  drawGame();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -gridSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = gridSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -gridSize; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = gridSize; dy = 0;
  }
});

placeFood();
setInterval(gameLoop, 150);



fetch("http://localhost:8080/api/scores", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ playerName: "Harish", score: score })
});
