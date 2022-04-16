



// Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const title = document.querySelector('.score');



// Snake settings
const tileSize = 60;
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

// Keyboard settings
let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 5;

// food settings
let foodPosX = 1;
let foodPosY = 0;

// Game settings
let gameIsRunning = true;

let fps = 10;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;





function gameLoop() {

    if( gameIsRunning ) {
        drawStuff();
        moveStuff();
        setTimeout( gameLoop, 1000 / fps );
    };
};

// Reset pred gameLoop je preto aby sa FOOD zobrazil na random pozícii
// Pretože default je 0,0;
resetFood();
gameLoop();


// OK
// Draw everything 
function drawStuff( color, x, y, width, height ) {
    //Background game
    rectangle( '#1e5363', 0, 0, canvas.width, canvas.height );

    // grid
    drawGrid();

    // Food
    rectangle( '#dc5e47', foodPosX, foodPosY, tileSize, tileSize );

    // tail
    tail.forEach( (snakePart) =>
        rectangle('#555', snakePart.x, snakePart.y, tileSize , tileSize )
    );

    // Snake 
    rectangle( '#d3dfd4', snakePosX, snakePosY, tileSize, tileSize );    
};
// rectangle make draw easier
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect( x, y, width, height );
};


function moveStuff() {

    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    // wall collision
    if (snakePosX > canvas.width - tileSize) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }
    if (snakePosY > canvas.height - tileSize) {
        snakePosY = 0;
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    tail.forEach( (snakePart) => {
        if( snakePosX === snakePart.x && snakePosY === snakePart.y ) {
            gameOver();
        }
    })
    
    // tail
    tail.push({ x:snakePosX, y: snakePosY });

    // forget earliest parts of snake
    tail = tail.slice(-1 * (snakeLength + score) );

    if( snakePosX === foodPosX && snakePosY === foodPosY ) {
        title.textContent = ++score;
        resetFood();
    }
};

function gameOver() {
    title.innerHTML = `☠️ <strong> ${score} </strong> ☠️`;
				gameIsRunning = false;
}


// ResetFood function
function resetFood() {

    if( snakeLength === tileCountX * tileCountY ) {
        gameOver();
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    // dont spawn food on snakes head
    if( foodPosX === snakePosX && foodPosY === snakePosY ) {
        resetFood(); 
    }

    // donst spawn food on any snake part 
    if( tail.some( snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY ) ) {
        resetFood;
    }
};


// Keyboard listeners
document.addEventListener('keydown', keyPush);

// OK
// Keyboard a.k.a pohyb šipkami
function keyPush(event) {

    switch(event.key) {
        case 'w':
            if( velocityY !== 1 ) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case 's':
            if( velocityY !== -1 ) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case 'a':
            if( velocityX !== 1 ) {
                velocityX = -1;
                velocityY = 0; 
            }
            break;

        case 'd':
            if( velocityX !== -1 ) {
                velocityX = 1;
                velocityY = 0;
            }
            break;

        case ' ':
            velocityX = 0;
            velocityY = 0;
            break;

        default:
            //restart game
            if(!gameIsRunning) {
                location.reload();
            }
            break;
    };
};

// OK
// Nakresli grid
function drawGrid() {
    for( let i = 0; i < tileCountX; i++ ) {
        for( let j = 0; j < tileCountY; j++ ){
            //Background game
            rectangle(
                '#5399a7',
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
                );
        };
    };
};




/*

let numbers = [ 'Roman', 'Peter', 'Tomaš', 'Ján', 'Jozef', 'Michal', 'Gabriel', 'Pavol', 'Šttefan', 'Vladimir', 'Roman', 'Andrej' ]

let randomName = Math.floor(Math.random() * numbers.length);

numbers = numbers[randomName];

console.log( randomName );
console.log( numbers );


*/


