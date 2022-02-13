const ratio = window.devicePixelRatio;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = document.body.clientWidth * ratio;
canvas.height = document.body.clientHeight * ratio;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ddd";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.imageSmoothingEnabled = true;
ctx.scale(ratio, ratio);

const board = [
  "-1 -1 -1 3 2 -1 -1 0 -1 -1 -1 4 -1 4 -1 -1 -1 4 -1 4 4 -1 4 -1 3 2 -1 -1 3 3 -1 3 2 0 0 1 -1 3 -1 3 -1 -1 4 -1 2",
  "2 -1 3 -1 -1 -1 2 -1 -1 4 -1 -1 5 -1 8 9 8 -1 -1 -1 -1 -1 -1 -1 4 4 -1 5 -1 -1 -1 -1 -1 -1 -1 -1 3 -1 5 -1 -1 6 -1 -1 -1",
  "1 -1 2 3 3 -1 -1 6 -1 -1 -1 6 -1 5 -1 -1 6 7 7 8 7 -1 6 -1 6 -1 6 6 5 4 -1 4 -1 0 -1 2 3 4 3 4 4 5 5 -1 3",
  "1 -1 -1 5 -1 -1 -1 8 7 -1 -1 6 6 -1 -1 -1 -1 -1 6 -1 -1 5 -1 5 -1 -1 4 5 5 5 -1 5 4 -1 0 1 2 3 3 3 3 4 4 -1 3",
  "-1 -1 6 -1 8 -1 7 -1 7 8 -1 8 7 -1 -1 -1 -1 -1 -1 -1 -1 -1 3 -1 3 -1 3 -1 -1 -1 4 -1 -1 -1 -1 -1 -1 2 1 2 1 2 3 -1 3",
  "-1 -1 -1 6 -1 -1 -1 6 -1 -1 -1 -1 -1 -1 9 9 -1 -1 6 -1 -1 -1 3 -1 -1 -1 2 1 -1 2 -1 -1 -1 3 3 -1 3 -1 4 -1 2 -1 2 -1 3",
  "4 5 5 -1 5 -1 6 -1 -1 -1 7 -1 7 7 -1 7 8 8 8 8 -1 -1 -1 -1 6 -1 -1 -1 3 -1 -1 3 -1 -1 -1 -1 -1 -1 -1 3 -1 -1 3 -1 2",
  "-1 -1 4 5 4 5 -1 7 -1 8 8 -1 -1 6 -1 -1 -1 7 -1 -1 -1 8 -1 -1 7 8 -1 6 -1 -1 -1 -1 -1 6 6 -1 -1 6 -1 6 -1 -1 3 -1 2",
  "3 -1 5 5 6 6 7 8 8 -1 7 -1 -1 -1 -1 -1 -1 -1 -1 7 8 8 -1 -1 -1 6 -1 6 7 -1 9 -1 8 -1 9 -1 6 -1 -1 6 6 -1 -1 4 2",
  "-1 5 5 6 6 7 7 7 -1 -1 -1 -1 6 -1 5 -1 6 -1 -1 -1 7 7 -1 6 5 -1 5 -1 -1 6 7 6 -1 -1 -1 -1 -1 7 -1 8 -1 6 5 -1 -1",
  "3 -1 6 6 8 -1 7 -1 -1 5 -1 -1 -1 6 -1 7 6 6 -1 -1 -1 -1 8 -1 6 5 5 -1 -1 -1 6 -1 -1 8 9 7 -1 -1 -1 -1 -1 8 7 -1 4",
  "-1 5 6 7 -1 6 -1 4 4 -1 6 -1 5 -1 7 7 7 -1 -1 -1 6 8 -1 -1 -1 -1 5 6 7 7 -1 -1 -1 7 -1 8 -1 5 -1 -1 6 -1 5 5 -1",
  "3 -1 6 7 8 -1 -1 -1 5 -1 5 -1 -1 5 7 7 6 5 -1 -1 6 6 6 5 -1 -1 6 6 8 -1 -1 8 -1 -1 -1 8 7 6 -1 6 -1 -1 4 -1 2",
  "-1 5 6 8 7 5 -1 -1 3 -1 5 -1 -1 4 6 5 6 -1 -1 3 -1 -1 6 -1 6 4 -1 6 8 -1 6 6 -1 -1 6 9 7 6 -1 -1 -1 1 -1 -1 1",
  "4 -1 6 7 7 -1 3 3 -1 -1 6 -1 5 -1 -1 5 6 -1 2 -1 2 -1 3 4 -1 -1 5 5 7 -1 -1 -1 4 -1 6 -1 5 -1 -1 1 1 1 2 -1 -1",
  "4 -1 6 7 -1 -1 3 -1 4 4 -1 6 -1 4 -1 -1 -1 4 2 0 2 3 -1 -1 4 3 -1 -1 -1 -1 -1 2 -1 -1 -1 -1 2 -1 0 -1 -1 -1 -1 -1 2",
  "-1 -1 6 7 -1 -1 -1 5 5 -1 6 -1 -1 4 5 6 5 5 2 2 2 3 -1 -1 3 2 1 -1 -1 -1 2 -1 -1 4 -1 1 -1 0 1 -1 3 4 4 -1 3",
  "1 -1 -1 6 6 6 -1 6 5 -1 3 3 -1 -1 -1 -1 -1 -1 4 -1 -1 4 -1 6 -1 -1 2 -1 5 -1 -1 1 -1 3 2 -1 1 -1 -1 2 -1 4 5 -1 3",
  "0 -1 -1 -1 6 -1 -1 -1 -1 -1 2 -1 3 3 -1 4 5 4 5 5 4 -1 3 5 5 -1 -1 6 6 5 2 -1 -1 -1 -1 -1 -1 -1 -1 2 -1 4 4 -1 3",
  "1 -1 1 -1 -1 5 -1 -1 4 5 -1 3 -1 4 -1 4 5 4 6 -1 4 2 2 -1 -1 4 -1 5 6 -1 4 -1 4 -1 0 0 -1 -1 1 -1 2 3 4 -1 3",
  "-1 -1 -1 -1 1 -1 4 5 -1 6 -1 -1 -1 -1 -1 -1 -1 -1 -1 6 -1 3 2 3 -1 -1 6 -1 -1 4 -1 6 -1 -1 -1 -1 1 1 -1 2 1 -1 3 -1 3",
  "1 -1 -1 2 -1 3 4 5 5 -1 7 6 -1 4 -1 4 3 3 4 -1 4 4 4 -1 3 3 -1 4 -1 -1 5 -1 4 -1 1 1 -1 -1 1 -1 0 -1 3 -1 3",
  "1 -1 -1 2 1 -1 -1 -1 6 -1 6 -1 5 3 5 3 3 -1 -1 -1 -1 5 5 -1 6 -1 -1 -1 4 5 -1 -1 3 2 -1 -1 2 -1 -1 -1 -1 2 3 -1 3",
  "2 -1 2 -1 -1 -1 -1 4 -1 6 6 4 -1 -1 -1 -1 4 2 5 4 5 3 -1 4 -1 5 5 6 -1 -1 6 -1 -1 -1 -1 -1 -1 1 2 1 2 1 3 -1 4",
  "-1 5 -1 3 -1 -1 -1 -1 5 7 6 4 -1 4 -1 4 -1 4 -1 5 -1 2 -1 -1 6 6 6 -1 -1 4 -1 5 -1 2 -1 0 -1 -1 -1 2 -1 2 3 -1 3",
  "3 -1 4 3 2 -1 -1 3 -1 8 6 -1 -1 -1 6 -1 5 4 4 -1 3 -1 2 -1 4 5 -1 6 -1 -1 4 -1 6 -1 -1 -1 -1 -1 1 -1 1 2 -1 -1 3",
  "-1 -1 3 3 -1 2 3 4 5 6 5 -1 1 -1 -1 6 -1 -1 -1 -1 -1 -1 4 -1 -1 -1 4 -1 3 3 -1 6 7 6 5 -1 -1 -1 -1 -1 -1 3 -1 -1 1",
  "2 -1 3 2 2 2 -1 5 -1 6 -1 -1 -1 2 -1 -1 7 6 6 4 -1 4 -1 4 4 -1 -1 6 3 -1 -1 7 7 -1 -1 -1 4 -1 0 0 1 -1 2 -1 2",
  "-1 -1 1 1 -1 3 -1 -1 -1 5 -1 4 3 -1 3 -1 -1 5 -1 -1 7 5 -1 4 -1 5 -1 5 4 -1 6 -1 7 -1 2 -1 5 -1 -1 0 0 -1 -1 -1 1",
  "1 2 -1 -1 -1 -1 -1 5 8 6 -1 4 -1 -1 -1 5 4 4 -1 5 7 -1 7 -1 -1 -1 7 -1 -1 7 -1 8 7 6 -1 3 -1 5 -1 3 -1 -1 1 1 1",
  "-1 1 0 2 3 -1 5 6 8 -1 -1 -1 5 6 6 -1 3 1 2 -1 -1 9 8 -1 -1 5 5 -1 -1 7 7 -1 7 -1 6 -1 -1 -1 5 3 3 3 -1 -1 0",
  "-1 0 -1 -1 5 -1 5 -1 6 5 -1 4 -1 -1 7 7 5 -1 -1 -1 6 6 6 -1 -1 -1 -1 7 -1 8 -1 5 -1 7 7 -1 4 -1 6 5 5 -1 4 -1 -1",
  "0 1 2 5 5 6 -1 -1 -1 4 5 -1 -1 5 -1 6 6 6 -1 -1 4 -1 5 -1 -1 4 5 6 8 -1 -1 -1 -1 -1 7 5 -1 -1 4 4 3 4 4 -1 -1",
  "-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 6 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 9 6 4 3 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 4",
  "-1 2 3 4 3 -1 1 3 3 3 -1 -1 5 5 -1 -1 2 -1 4 3 2 2 -1 -1 4 4 3 4 5 -1 -1 2 2 2 -1 3 3 3 3 4 -1 4 -1 5 -1",
].map((row) => row.split(" ").map((x) => parseInt(x, 10)));

const solution = board.map((row) => row.map((value) => 0));

const rows = board.length;
const cols = board[0].length;

console.log(`${cols}x${rows}`);

const FILLED = 1;
const EMPTY = 2;

function drawBoard(board: number[][], solution: number[][]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(10, 10);

  const dim = 15;

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let rowIndex = 0; rowIndex < rows; ++rowIndex) {
    const row = board[rowIndex];
    const y = rowIndex * dim;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const value = row[colIndex];
      const x = colIndex * dim;

      // background
      if (solution[rowIndex][colIndex] === FILLED) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, dim, dim);
      } else if (solution[rowIndex][colIndex] === EMPTY) {
        ctx.fillStyle = "#bbb";
        ctx.fillRect(x, y, dim, dim);
      }

      // text
      if (value >= 0) {
        if (solution[rowIndex][colIndex] === FILLED) {
          ctx.save();
          ctx.strokeStyle = "#aaa";
          ctx.strokeText(`${value}`, x + dim / 2, y + dim / 2);
          ctx.restore();
        } else {
          ctx.save();
          ctx.strokeStyle = "#444";
          ctx.strokeText(`${value}`, x + dim / 2, y + dim / 2);
          ctx.restore();
        }
      }

      // outline
      ctx.strokeRect(x, y, dim, dim);
    }
  }

  ctx.restore();
}

function solve(board, solution): number {
  let changes = 0;

  for (let rowIndex = 0; rowIndex < rows; ++rowIndex) {
    const row = board[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const value = board[rowIndex][colIndex];
      if (value < 0) continue;

      let empty = 0;
      let filled = 0;

      const ns = neighbours(rowIndex, colIndex);
      for (const neighbour of ns) {
        if (solution[neighbour[0]][neighbour[1]] === FILLED) {
          filled++;
        } else if (solution[neighbour[0]][neighbour[1]] === EMPTY) {
          empty++;
        }
      }

      const free = ns.length - empty - filled;

      if (free === value - filled) {
        // take free ones
        for (const neighbour of ns) {
          if (solution[neighbour[0]][neighbour[1]] === 0) {
            solution[neighbour[0]][neighbour[1]] = FILLED;
            changes++;
          }
        }
      } else if (filled === value) {
        if (free > 0) {
          // already full, empty out
          for (const neighbour of ns) {
            if (solution[neighbour[0]][neighbour[1]] === 0) {
              solution[neighbour[0]][neighbour[1]] = EMPTY;
              changes++;
            }
          }
        }
      }
    }
  }

  return changes;
}

function neighbours(r: number, c: number): [number, number][] {
  const l: [number, number][] = [];
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      if (r + i >= 0 && r + i < rows && c + j >= 0 && c + j < cols) {
        l.push([r + i, c + j]);
      }
    }
  }
  return l;
}

while (true) {
  const changes = solve(board, solution);
  if (!changes) break;
}

drawBoard(board, solution);
