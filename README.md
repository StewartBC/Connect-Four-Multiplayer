# RPS-Multiplayer


two arrays, one for each player

each array has 7 subarrays for each columnm, each index is a boolean

only allow move if the boolean of that index is false

when user moves, change their index array if their all of the indexes below their choise are true and increase their move# by 1

push their array and move number var to firebase

firebase listener for changes in array and player move #

red always goes first

global vars and firebase vars for amount of moves made by each player

when red moves, only allow them to push their move if their number of moves is equal to blue's number of moves

when blue moves, only allow them to push their move if their number of moves is 1 less than red's number of moves

after grabbing info from firebase call function to add classes to each table row/column index to cahnge their color

check wins:

when red user moves, grab ttheir array index for their move, lets say they put a piece at column 4, row 3
function checkVerticalWin() {
    vertCount++;
if (redPlayer[3][2 + 1] === true) {
    vertCount++;
    if (redPlayer[3][2+2] === true) {
        vertCount++;
        if (redPlayer[3][2+3] === true) {
            vertCount++;
        } else if (redPlayer[3][2-1] === true) {
            vertCount+++;
        }
    } else if (redPlayer[3][2-1] === true) {
        vertCount++;
        if (redPlayer[3][2-2] === true) {
            vertCount++;
        }
    }
} else if (redPlayer[3][2-1] === true) {
    vertCount++;
    if (redPlayer[3][2-2] === true) {
        vertCount++;
    }
}
}