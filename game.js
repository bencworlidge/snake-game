//Importing elements 
import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, snakeSpeed } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')

//Main Game Loop
function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost! Press ok to restart.')) {
            window.location = '/'
        }
        return 
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 500;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    update()

    draw()
}

window.requestAnimationFrame(main) 

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}