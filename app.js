// Select DOM elements
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let scoreO = document.getElementById("scoreO");
let scoreX = document.getElementById("scoreX");

let turnO = true; // Player O starts
let winpatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Columns
  [0, 4, 8], [2, 4, 6]               // Diagonals
];

// Reset the game board (without changing scores)
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");

  // Remove winner highlight
  boxes.forEach(box => box.classList.remove("winner-line"));
};

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "blue";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "darkgray";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes and clear them
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show winner overlay, update score, animate winning line
const showWinner = (winner, pattern) => {
  msg.innerText = `🏆 Winner: ${winner}`;
  msgContainer.classList.remove("hide");

  // Animate winning line
  if (pattern) {
    pattern.forEach(index => boxes[index].classList.add("winner-line"));
  }

  // Update scoreboard
  if (winner === "O") scoreO.innerText = parseInt(scoreO.innerText) + 1;
  else scoreX.innerText = parseInt(scoreX.innerText) + 1;

  disableBoxes();
};

// Check for winner or draw
const checkWinner = () => {
  let draw = true;

  for (let pattern of winpatterns) {
    let [a, b, c] = pattern;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1, pattern); // Pass winning pattern for animation
      return;
    }
  }

  boxes.forEach(box => {
    if (box.innerText === "") draw = false;
  });

  if (draw) {
    msg.innerText = "🤝 It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Event listeners
newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", () => {
  // Reset board + scores
  resetGame();
  scoreO.innerText = 0;
  scoreX.innerText = 0;
});
