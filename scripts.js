function validateForm() { //function to validate input taken from the user 
    let x = document.forms["others"].value;
    if (x == "") {
      alert("form must be filled out");
      return false;
    }
  }
  const boxes = document.querySelectorAll(".box"); //get all the boxes

const restart = document.getElementById("restart"); //get the restart button

const WINNIG_SCHEME = [  // WINNING COMBINATION
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const O = "O";  //initialize the game
const X = "X";  //initialize the game

let currentPlayer = O; //initialize the game
const board = new Array(9).fill(null);      //initialize the game

const boxClicked = (e) => {     //function to check if the box is empty
  const id = e.target.id;   //get the id of the box

  if (!board[id]) {         //if the box is empty
    board[id] = currentPlayer;  //fill the box with the current player
    e.target.innerText = currentPlayer; //display the current player in the box
    if (checkLine2()) endGame();    //check if the current player has won
    if (!board.some((e) => e === null)) endGame("draw");    //check if the game is a draw
    //if the game is not a draw and the current player has not won, switch the current player
    currentPlayer = currentPlayer === O ? X : O;    //switch the current player
  }
};

const endGame = (result) => {       //function to end the game
  intro.innerText = result == "draw" ? "Draw!" : currentPlayer + " has won!"; //if the game is a draw, display "draw"
  boxes.forEach((box) => box.removeEventListener("click", boxClicked)); //remove the event listener
};

const restartGame = () => { //function to restart the game
  currentPlayer = O;    //initialize the game
  board.fill(null);     //initialize the game
  boxes.forEach((box) => {     //initialize the game
    box.innerText = "";   //initialize the game
  }); 

  intro.innerText = "Let's play!"; 
  boxes.forEach((box) => box.addEventListener("click", boxClicked)); 
};

const checkLine = () => {
  /* WINNING COMBINATION 

0,1,2
3,4,5
6,7,8
0,3,6
1,4,7
2,5,8,
0,4,8,
2,4,6

*/

  //Top line = [0,1,2]
  if (currentPlayer == board[0] && board[0] == board[1] && board[1] == board[2])
    return true;
  //Middle line = [3,4,5]
  if (currentPlayer == board[3] && board[3] == board[4] && board[3] == board[5])
    return true;
  //Bottom line = [6,7,8]
  if (currentPlayer == board[6] && board[6] == board[7] && board[6] == board[8])
    return true;
  //Left column = [0,3,6]
  if (currentPlayer == board[0] && board[0] == board[3] && board[0] == board[6])
    return true;
  //Middle column = [1,4,7]
  if (currentPlayer == board[1] && board[1] == board[4] && board[1] == board[7])
    return true;
  //Right column = [2,5,8]
  if (currentPlayer == board[2] && board[2] == board[5] && board[2] == board[8])
    return true;
  //Slash diagonal = [0,4,8]
  if (currentPlayer == board[0] && board[0] == board[4] && board[0] == board[8])
    return true;
  //Backslash diagonal = [2,4,6]
  if (currentPlayer == board[2] && board[2] == board[4] && board[2] == board[6])
    return true;

  return false;
};

const checkLine2 = () => { //function to check if the current player has won
  return WINNIG_SCHEME.some((combination) => { //check if the current player has won
    if (
      currentPlayer == board[combination[0]] &&
      board[combination[0]] == board[combination[1]] &&
      board[combination[0]] == board[combination[2]]
    )
      return true;  //if the current player has won, return true

    return false; //if the current player has not won, return false
  });
};

boxes.forEach((box) => box.addEventListener("click", boxClicked)); //add the event listener to each box
restart.addEventListener("click", restartGame); //add the event listener to the restart button


