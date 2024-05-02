// Get the canvas element and its context
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Define the size of the grid (each cell will be 16x16 pixels)
var grid = 16;

// Variable to control the game speed
var count = 0;

// Define the snake object
var snake = {
  x: 160,  // Initial horizontal position
  y: 160,  // Initial vertical position
  dx: grid,  // Horizontal speed
  dy: 0,  // Vertical speed (initially the snake doesn't move vertically)
  cells: [],  // Array to keep track of the cells the snake body occupies
  maxCells: 4  // Initial snake length (in cells)
};

// Define the apple object
var apple = {
  x: 320,  // Initial horizontal position
  y: 320  // Initial vertical position
};

// Function to get a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Main game loop
function loop() {
  // Use requestAnimationFrame for smooth animation
  requestAnimationFrame(loop);

  // Control the game speed by skipping three out of every four frames
  if (++count < 4) {
    return;
  }

  // Reset the count
  count = 0;

  // Clear the canvas
  context.clearRect(0,0,canvas.width,canvas.height);

  // Move the snake by updating its position
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap the snake position if it moves off the edge of the canvas
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Add a new cell to the front of the snake
  snake.cells.unshift({x: snake.x, y: snake.y});

  // Remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Draw the apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // Draw the snake
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // Check if the snake has eaten the apple
    if (cell.x === apple.x && cell.y === apple.y) {
      // Increase the snake length
      snake.maxCells++;

      // Move the apple to a random position
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // Check for collision with the snake body
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // Reset the game
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        // Move the apple to a random position
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// Listen for keydown events to control the snake
document.addEventListener('keydown', function(e) {
  // Prevent the snake from reversing into itself
  if (e.which === 37 && snake.dx === 0) {  // Left arrow key
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {  // Up arrow key
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {  // Right arrow key
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {  // Down arrow key
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Start the game loop
requestAnimationFrame(loop);