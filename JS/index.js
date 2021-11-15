//Game variables and constants
let inputDir = {x: 0,y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 6;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [
    {x: 13,y: 15}
];
food = {x: 4,y: 6};

//Game Functions

function main(ctime){

    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function iscollide(snake){
    //When snake is bump into itself.
    for(let i=1; i<snakeArr.length; i++){
     if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
         return true;
     }
    }
    //When snake is bump into wall.
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine(){
    // calling iscollide function
    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0,y: 0};
        alert("Game Over!..Press any key to play again.");
        snakeArr = [{x: 13,y: 15}];
        musicSound.play();
        score = 0;
    }

    //part-1:- Updating the snake and food

    for(let i=snakeArr.length - 2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //if snake has eaten the food then add a block of body in it.
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y)
    {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

    //jaise hi position of food and position of head of snake same hoga then food ka position change 
    //kar dena hai and block of body to add hohi raha hai....
    
    //Generating random position of food
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

    }
    //part-2:- Displaying the snake and food

    // Snake:- 
    board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // food:- 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);

}

//Main Logic Of Game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0,y: -1};
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});