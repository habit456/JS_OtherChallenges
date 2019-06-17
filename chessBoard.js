let data = [" ", "#", "\n"];

function chessBoard(size) {
  let line1 = "", line2 = "", chessBoard = "";
  while (line1.length <= size) {
    line1 += data[0];
    if (line1.length === size) {
      break;
    }
    line1 += data[1];
  }
  line1 += data[2];
  while (line2.length <= size) {
    line2 += data[1];
    if (line2.length === size) {
      break;
    }
    line2 += data[0];
  }
  line2 += data[2];
  for (let i=0; i<size; i++) {
    chessBoard += line1;
    i++;
    if (i === size) {
      break;
    }
    chessBoard += line2;
  }
  return chessBoard;
}

console.log(chessBoard(5));