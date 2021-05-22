import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");
  let isGameOver = false;
  let birdLeft = 220;
  let birdBottom = 325;
  let gravity = 2;
  let score = 0;
  let gameInterval;
  function startGame() {
    gameInterval = setInterval(startBird, 20);
    document.addEventListener("keyup", control);
    generateObstacle();
  }
  startGame();
  function startBird() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }
  function jump() {
    birdBottom < 480 && (birdBottom += 50);
    bird.style.bottom = birdBottom + "px";
  }

  function generateObstacle() {
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    let obstacleLeft = 440;
    let randomHeight = Math.random() * 60;
    if (!isGameOver) {
      topObstacle.classList.add("obstacle-top");
      obstacle.classList.add("obstacle");
    }
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = randomHeight + "px";
    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = randomHeight + 450 + "px";
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    function moveObstacle() {
      obstacleLeft -= 2;
      topObstacle.style.left = obstacleLeft + "px";
      obstacle.style.left = obstacleLeft + "px";
      if (obstacleLeft === 0) {
        score++;
        clearInterval(obstacleTimer);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (birdBottom <= 0 || isOverLapping(obstacle, topObstacle, bird)) {
        gameOver();
        clearInterval(obstacleTimer);
      }
    }
    let obstacleTimer = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  function gameOver() {
    showScorePopup();
    clearInterval(gameInterval);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }

  function isOverLapping(obstacle, topObstacle, bird) {
    const rect1 = obstacle.getBoundingClientRect();
    const rect2 = topObstacle.getBoundingClientRect();
    const rect3 = bird.getBoundingClientRect();

    return (
      !(
        rect1.right < rect3.left ||
        rect1.left > rect3.right ||
        rect1.bottom < rect3.top ||
        rect1.top > rect3.bottom
      ) ||
      !(
        rect2.right < rect3.left ||
        rect2.left > rect3.right ||
        rect2.bottom < rect3.top ||
        rect2.top > rect3.bottom
      )
    );
  }
  function showScorePopup() {
    const scoreCard = document.querySelector(".score-card");
    const displayScore = document.querySelector("#score");
    const highest = document.querySelector("#highest");

    let highScore = window.localStorage.getItem("highestScore");
    if (!highScore || highScore < score) {
      highScore = score;
    }
    window.localStorage.setItem("highestScore", `${highScore}`);
    displayScore.appendChild(document.createTextNode(` ${score}`));
    highest.appendChild(document.createTextNode(` ${highScore}`));
    scoreCard.style.display = "block";
  }
  document.querySelector(".btn").addEventListener("click", () => {
    window.location.reload();
  });
});
