//set up variables of the grid size and blocks within the grid
var blockSize = 25;
var rows = 20;
var columns = 20;

//Snake position variables and start it right off of the border
var snakeX = 2 * blockSize;
var snakeY = 2 * blockSize;
//And an array for the snake body
var snakeBody = [];

//Set speed of snake
var speedX = 0;
var speedY = 0;

//Also set the coordinate variables for food
var foodX = 0;
var foodY = 0;

//Set the game state
var gameOver = false;

//set the count of food eat to keep track of your level
var foodCount = 0;

window.onload = function() {
    //set up the canvas area to make the game board
    gameBoard = document.getElementById("gameBoard");
    gameBoard.height = rows * blockSize;
    gameBoard.width = columns * blockSize;
    //Set the context of the drawing to 2D
    context = gameBoard.getContext("2d");

    placeFood();

    //make the event listener to change directions
    document.addEventListener("keydown", changeDirection);

    //Setting the speed of the snake
    setInterval(runGame, 100);
}


//Main function to continually run the game
function runGame() {
    //if it is game over then end the game
    if (gameOver) {
        return;
    }

    //fill in the board
    context.fillStyle = "black";
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);

    //place the food in the correct place
    context.fillStyle = "lightgrey";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //save all the snake coordinates in the snake body variable
    for (i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    //save the new position of the head of the snake
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }


    //Generate the snake
    //place the head of the snake in the right direction of the snake
    context.fillStyle = "green";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize ,blockSize);
    //place the snake on the game board
    for (i = 0; i < snakeBody.length; i++) {
        //generate the blocks for each piece of the body
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //if the snake hits itself then gameover
    if (snakeBody.length > 1) {
        for (i = 1; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game Over! You got " + foodCount + " points!");
            }
        }
    }
    
    //eat food and get bigger
    if (snakeX == foodX && snakeY == foodY) {
        //add the current position of the snake head to the snakeBody array and then place the food in a new place
        snakeBody.push([snakeX, snakeY]);
        placeFood();
        foodCount += 1;
        document.getElementById("score").innerHTML ="Score: " + foodCount;
    }

    //If snake goes out of bounds then gameover
    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("Game Over! You got " + foodCount + " points!");
    }

}




//Changing direction of the snake function
function changeDirection(k) {
    if (k.code == "ArrowUp" && speedY != 1) {
        //if up arrow is pressed and not already going down
        //adjust the speed variables to make the snake go in the up direction
        speedX = 0;
        speedY = -1;
    }
    if (k.code == "ArrowDown" && speedY != -1) {
        //if down arrow is pressed and not already going up
        //adjust the speed variables to make the snake go in the down direction
        speedX = 0;
        speedY = 1;
    }
    if (k.code == "ArrowRight" && speedX != -1) {
        //if right arrow is pressed and not already going left
        //adjust the speed variables to make the snake go in the right direction
        speedX = 1;
        speedY = 0;
    }
    if (k.code == "ArrowLeft" && speedX != 1) {
        //if left arrow is pressed and not already going right
        //adjust the speed variables to make the snake go in the left direction
        speedX = -1;
        speedY = 0;
    }
}


//Function to place the food
function placeFood() {
    //get the random coordinates for x and y of food
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * columns) * blockSize;
}