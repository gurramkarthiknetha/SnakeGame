const palayBoard = document.getElementById('game-card');
let foodx, foody,indices,snakex,snakey,direction,c;
function resett(){
snakex = 5, snakey = 10;
indices = [[snakex, snakey]];
direction = { x: 0, y: 0 }; 
c=0;
} 
resett()
// let direction = { x: 0, y: 0 }; 
let hs=0;
let h=document.getElementById('hs');
function FoodChange() {
    foodx = Math.floor(Math.random() * 30) + 1; 
    foody = Math.floor(Math.random() * 30) + 1;
}
const gameForFood = () => {
    if (snakex === foodx && snakey === foody) {
        indices.push([foodx, foody]); 
        FoodChange(); 
        c+=1;
        let score=document.getElementById('score');
        score.textContent="Score : "+c;
        console.log(c)
        console.log(indices);
    }
    let food = `<div class="food" style="grid-area:${foody} / ${foodx};background-color: red;"></div>`;
    palayBoard.innerHTML = food;
    
    let snakeHTML = ''; // Initialize empty string to accumulate snake segments
    for (let i = 0; i < indices.length; i++) {
        snakeHTML += `<div class="food" style="grid-area:${indices[i][1]} / ${indices[i][0]};background-color: yellow;"></div>`;
        console.log(indices[i][1],indices[i][0]);
    }

    palayBoard.innerHTML += snakeHTML; // Append all snake segments
}

// Function to handle key presses and update the direction
function keypress(e) {
    // Update direction based on arrow key presses
    if (e.key === "ArrowUp") {
        direction = { x: 0, y: -1 };
    } else if (e.key === "ArrowDown") {
        direction = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft") {
        direction = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight") {
        direction = { x: 1, y: 0 };
    }
}

// Function to move the snake and update the game state
function moveSnake() {
    // Move the snake's head
    snakex += direction.x;
    snakey += direction.y;

    // Check for collisions with the walls
    if (snakex < 1 || snakex > 30 || snakey < 1 || snakey > 30) {
        if(hs<c){
            hs=c;
            h.textContent="High Score:" +hs;
            c=0;
            score.textContent="Score : "+c;
        }
        resett();
        gameForFood();
        // alert('Game Over')
        clearInterval(gameInterval); 
        ///reset 
        
        
        let gameInterval = setInterval(moveSnake, 100);
        return;
    }

    // Update snake body positions
    indices.unshift([snakex, snakey]); // Add new head position
    indices.pop(); // Remove the tail position

    gameForFood(); // Update the game state
}

// Set up the game
let gameInterval = setInterval(moveSnake, 100); // Move the snake at intervals
document.addEventListener("keydown", keypress); // Listen for key presses to change direction

// Initial game setup
FoodChange(); // Place the initial food
gameForFood(); // Render the initial game state
