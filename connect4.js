gameRunning = false

class Game {
  constructor(player1, player2, WIDTH = 7, HEIGHT = 6) {
    this.players = [player1, player2];
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;
    this.board = [];
    this.currPlayer = player1;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById("board");
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    this.handleClick = this.handleClick.bind(this);
    top.addEventListener("click", this.handleClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${this.players.indexOf(this.currPlayer) + 1}`);
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
  }

  handleClick(evt) {
    // get x from ID of clicked cell

    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      console.log("Game end");
      this.endGame(`Player ${this.currPlayer.color} won!`);
      return;
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // switch players
    this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  checkForWin() {
    const _win = (cells) => {
      return cells.every(([y, x]) => {
        // console.log(y, x)
        // console.log(this.board[y][x]);
        // console.log(this.currPlayer);
        return (y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer);
      });
    };
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];
        
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

const start = document.querySelector("form");
start.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const p1 = document.getElementById("p1c");
  const p2 = document.getElementById("p2c");
  if(!gameRunning) {
  let player1 = new Player(p1.value);
  let player2 = new Player(p2.value);
  new Game(player1, player2);
  gameRunning = true
  } else {
    alert('Game already running!')
  }
  p1.value = "";
  p2.value = "";
});
