
// Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// player

const tileSize = 50;
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 0;
let velocityY = 0;

const fps = 5;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

// food 
let foodPosX = 300;
let foodPosY = 100;



// loop opakovanie donekonečna
function gameLoop() {
    
    drawStuff()
    moveStuff()

    setTimeout(gameLoop, 1000 / 5 );


    // Tento frame požuívame pri plynulých hrach
    // equestAnimationFrame(gameLoop);
};

gameLoop();


// Draw everything
function drawStuff() {

    // White space, needed for repeatable tasks
    rectangle( "#f6d95b", 0, 0, canvas.width, canvas.height );

     // grid
    drawGrid()

    // Random position for food
    rectangle( "pink", foodPosX, foodPosY, tileSize, tileSize );

    // Color of the snake, starting position and size of the snake
    rectangle( "#494042", snakePosX, snakePosY , tileSize, tileSize );
}

// Funckcia ktorá vytvori stvoruholník
function rectangle( color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect( x, y, width, height );
    ctx.fill
}



// Move everything
function moveStuff() {

    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    // Wall collision
    if( snakePosX > (canvas.width - tileSize) ) {
        snakePosX = 0;
    }

    if( snakePosX < 0 ) {
        snakePosX = canvas.width;
    }

    if( snakePosY > (canvas.height) ) {
        snakePosY = tileSize;
    }

    if( snakePosY < 0 ) {
        snakePosY = canvas.height - tileSize;
    }




    // food collision
    if( snakePosX  === foodPosX && snakePosY === foodPosY ) {
        foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
        foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
        
        
    }


    

}


// Move of the snake from keybord
document.addEventListener('keydown', function keyPush( event) {

    switch(event.key) {
        case "w":
            if( velocityY !== 1 ) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case "s":
            if( velocityY !== -1 ) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case "a":
            if( velocityX !== 1 ) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case "d":
            if( velocityX !== -1 ) {
                velocityX = 1;
                velocityY = 0;
            }
            break;

        case " ":
            velocityX = 0;
            velocityY = 0;
            break;
    }
});

function drawGrid() {
    for( let i = 0; i < tileCountX; i++ ) {
        for( let j = 0; j < tileCountY; j++ ) {
            rectangle( 
                "#99C1DC",
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
};





console.log(ctx);
