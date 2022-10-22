const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const computerScoreDiv = document.querySelector("[result-score-computer]");
const yourScoreDiv = document.querySelector("[result-score-you]");
const yourScoreSpan = document.querySelector("[data-your-score]");

// global array to all our selections with in it all our passiable sellections
const SELECTIONS = [
  {
    name: "rock",
    emoji: "🧱",
    beats: "scissors",
    key: "q",
  },
  {
    name: "paper",
    emoji: "📄",
    beats: "rock",
    key: "w",
  },
  {
    name: "scissors",
    emoji: "✂",
    beats: "paper",
    key: "e",
  },
];
// to get the name from the data selection
selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    //(looping throw all the difrent section to find the one has the same name)
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    playerSelection(selection);
  });
});
// for the key press
document.addEventListener("keydown", (e) => {
  const selection = SELECTIONS.find((selection) => selection.key === e.key);
  if (!selection) return;
  playerSelection(selection);
});

//
function playerSelection(selection) {
  const computerSelection = computerPlay();
  const yourWinner = playRound(selection, computerSelection);
  const computerWinner = playRound(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan, "you");

  if (computerWinner) incrementScore(computerScoreSpan, "computer");
}

function incrementScore(scoreSpan, name) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
  if (scoreSpan.innerText == "5") {
    alert(`${name}  winn!`);
    window.location.reload();
  }
}
// to add the results to the screen
//<!-- <div class="result-selection winner">🧱</div>
//<div class="result-selection">✂</div> -->
function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}
// to determen the winner
function playRound(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}
// for the computer sellection from the array of sellection
function computerPlay() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
