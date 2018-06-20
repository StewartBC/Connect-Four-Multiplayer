// Initialize Firebase
var config = {
    apiKey: "AIzaSyCkVUDNPHsQLHKaQMpjrH5lY8wkdQHHjbU",
    authDomain: "connect-four-e6c37.firebaseapp.com",
    databaseURL: "https://connect-four-e6c37.firebaseio.com",
    projectId: "connect-four-e6c37",
    storageBucket: "",
    messagingSenderId: "475593135095"
};
firebase.initializeApp(config);

var database = firebase.database();

var gameArray = [
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"]
];

var blankArray = [
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"]
];

var redMoves = 0;
var yellowMoves = 0;
var redWins = 0;
var yellowWins = 0;
var redCount = 1;
var yellowCount = 1;
var userColor;
var playerCount = 0;
var timeRemaining = 30;
var intervalId;
var totalMoves = 0;


function calcRedWinVert(row, column) {
    if (row !== 5 && gameArray[row + 1][column] === "red") {
        redCount++;
        if (row !== 4 && gameArray[row + 2][column] === "red") {
            redCount++;
            if (row !== 3 && gameArray[row + 3][column] === "red") {
                redCount++;
            } else if (row !== 0 && gameArray[row - 1][column] === "red") {
                redCount++;
            }
        } else if (row !== 0 && gameArray[row - 1][column] === "red") {
            redCount++;
            if (row !== 1 && gameArray[row - 2][column] === "red") {
                redCount++;
            }
        }
    } else if (row !== 0 && gameArray[row - 1][column] === "red") {
        redCount++;
        if (row !== 1 && gameArray[row - 2][column] === "red") {
            redCount++;
            if (row !== 2 && gameArray[row - 3][column] === "red") {
                redCount++;
            }
        }
    }
    alertRedWin();
}

function calcYellowWinVert(row, column) {
    if (row !== 5 && gameArray[row + 1][column] === "yellow") {
        yellowCount++;
        if (row !== 4 && gameArray[row + 2][column] === "yellow") {
            yellowCount++;
            if (row !== 3 && gameArray[row + 3][column] === "yellow") {
                yellowCount++;
            } else if (row !== 0 && gameArray[row - 1][column] === "yellow") {
                yellowCount++;
            }
        } else if (row !== 0 && gameArray[row - 1][column] === "yellow") {
            yellowCount++;
            if (row !== 1 && gameArray[row - 2][column] === "yellow") {
                yellowCount++;
            }
        }
    } else if (row !== 0 && gameArray[row - 1][column] === "yellow") {
        yellowCount++;
        if (row !== 1 && gameArray[row - 2][column] === "yellow") {
            yellowCount++;
            if (row !== 2 && gameArray[row - 3][column] === "yellow") {
                yellowCount++;
            }
        }
    }
    alertYellowWin();
}

function calcRedWinHoriz(row, column) {
    if (column !== 5 && gameArray[row][column + 1] === "red") {
        redCount++;
        if (column !== 4 && gameArray[row][column + 2] === "red") {
            redCount++;
            if (column !== 3 && gameArray[row][column + 3] === "red") {
                redCount++;
            } else if (column !== 0 && gameArray[row][column - 1] === "red") {
                redCount++;
            }
        } else if (column !== 0 && gameArray[row][column - 1] === "red") {
            redCount++;
            if (column !== 1 && gameArray[row][column - 2] === "red") {
                redCount++;
            }
        }
    } else if (column !== 0 && gameArray[row][column - 1] === "red") {
        redCount++;
        if (column !== 1 && gameArray[row][column - 2] === "red") {
            redCount++;
            if (column !== 2 && gameArray[row][column - 3] === "red") {
                redCount++;
            }
        }
    }
    alertRedWin();
}

function calcYellowWinHoriz(row, column) {
    if (column !== 5 && gameArray[row][column + 1] === "yellow") {
        yellowCount++;
        if (column !== 4 && gameArray[row][column + 2] === "yellow") {
            yellowCount++;
            if (column !== 3 && gameArray[row][column + 3] === "yellow") {
                yellowCount++;
            } else if (column !== 0 && gameArray[row][column - 1] === "yellow") {
                yellowCount++;
            }
        } else if (column !== 0 && gameArray[row][column - 1] === "yellow") {
            yellowCount++;
            if (column !== 1 && gameArray[row][column - 2] === "yellow") {
                yellowCount++;
            }
        }
    } else if (column !== 0 && gameArray[row][column - 1] === "yellow") {
        yellowCount++;
        if (column !== 1 && gameArray[row][column - 2] === "yellow") {
            yellowCount++;
            if (column !== 2 && gameArray[row][column - 3] === "yellow") {
                yellowCount++;
            }
        }
    }
    alertYellowWin();
}

function calcRedWinDiagUp(row, column) {
    if (row !== 5 && column !== 5 && gameArray[row + 1][column + 1] === "red") {
        redCount++;
        if (row !== 4 && column !== 4 && gameArray[row + 2][column + 2] === "red") {
            redCount++;
            if (row !== 3 && column !== 3 && gameArray[row + 3][column + 3] === "red") {
                redCount++;
            } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "red") {
                redCount++;
            }
        } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "red") {
            redCount++;
            if (row !== 1 && column !== 1 && gameArray[row - 2][column - 2] === "red") {
                redCount++;
            }
        }
    } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "red") {
        redCount++;
        if (row !== 1 && column !== 1 && gameArray[row - 2][column - 2] === "red") {
            redCount++;
            if (row !== 2 & column !== 2 && gameArray[row - 3][column - 3] === "red") {
                redCount++;
            }
        }
    }
    alertRedWin();
}

function calcYellowWinDiagUp(row, column) {
    if (row !== 5 && column !== 5 && gameArray[row + 1][column + 1] === "yellow") {
        yellowCount++;
        if (row !== 4 && row !== 4 && gameArray[row + 2][column + 2] === "yellow") {
            yellowCount++;
            if (row !== 3 && column !== 3 && gameArray[row + 3][column + 3] === "yellow") {
                yellowCount++;
            } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "yellow") {
                yellowCount++;
            }
        } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "yellow") {
            yellowCount++;
            if (row !== 1 && column !== 1 && gameArray[row - 2][column - 2] === "yellow") {
                yellowCount++;
            }
        }
    } else if (row !== 0 && column !== 0 && gameArray[row - 1][column - 1] === "yellow") {
        yellowCount++;
        if (row !== 1 && column !== 1 && gameArray[row - 2][column - 2] === "yellow") {
            yellowCount++;
            if (row !== 2 && column !== 2 && gameArray[row - 3][column - 3] === "yellow") {
                yellowCount++;
            }
        }
    }
    alertYellowWin();
}

function calcRedWinDiagDown(row, column) {
    if (row !== 5 && column !== 0 && gameArray[row + 1][column - 1] === "red") {
        redCount++;
        if (row !== 4 && column !== 1 && gameArray[row + 2][column - 2] === "red") {
            redCount++;
            if (row !== 3 && column !== 2 && gameArray[row + 3][column - 3] === "red") {
                redCount++;
            } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "red") {
                redCount++;
            }
        } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "red") {
            redCount++;
            if (gameArray[row - 2][column + 2] === "red") {
                redCount++;
            }
        }
    } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "red") {
        redCount++;
        if (row !== 1 && column !== 4 && gameArray[row - 2][column + 2] === "red") {
            redCount++;
            if (row !== 2 && column !== 3 && gameArray[row - 3][column + 3] === "red") {
                redCount++;
            }
        }
    }
    alertRedWin();
}

function calcYellowWinDiagDown(row, column) {
    if (row !== 5 && column !== 0 && gameArray[row + 1][column - 1] === "yellow") {
        yellowCount++;
        if (row !== 4 && column !== 1 && gameArray[row + 2][column - 2] === "yellow") {
            yellowCount++;
            if (row !== 3 && colum !== 2 && gameArray[row + 3][column - 3] === "yellow") {
                yellowCount++;
            } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "yellow") {
                yellowCount++;
            }
        } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "yellow") {
            yellowCount++;
            if (row !== 1 && column !== 4 && gameArray[row - 2][column + 2] === "yellow") {
                yellowCount++;
            }
        }
    } else if (row !== 0 && column !== 5 && gameArray[row - 1][column + 1] === "yellow") {
        yellowCount++;
        if (row !== 1 && column !== 4 && gameArray[row - 2][column + 2] === "yellow") {
            yellowCount++;
            if (row !== 2 && column !== 3 && gameArray[row - 3][column + 3] === "yellow") {
                yellowCount++;
            }
        }
    }
    alertYellowWin();
}

function calcRedWin(row, column) {
    calcRedWinVert(row, column);
    calcRedWinHoriz(row, column);
    calcRedWinDiagUp(row, column);
    calcRedWinDiagDown(row, column);
}

function calcYellowWin(row, column) {
    calcYellowWinVert(row, column);
    calcYellowWinHoriz(row, column);
    calcYellowWinDiagUp(row, column);
    calcYellowWinDiagDown(row, column);
}

function calcWin(color, row, column) {
    if (color === "red") {
        calcRedWin(row, column);
    } else {
        calcYellowWin(row, column);
    }
    for (p = 0; p < gameArray.length; p++) {
        var blankSpaces = 0;
        for (y = 0; y < gameArray[p].length; y++) {
            if (gameArray[p][y] === "blank") {
                blankSpaces++;
            }
        }
        if (blankSpaces === 0) {
            alert("The match is a tie!");
            setTimeout(function () {
                console.log("1");
                resetGame();
            }, 5000);
        }
    }
}

function alertRedWin() {
    if (redCount > 3) {
        $("#redAlert").text("");
        $("#redAlert").text("Red has won!");
        redWins++;
        database.ref("/players").update({
            playerCount: 0,
        });
        clearInterval(intervalId);
        setTimeout(function () {
            console.log("2");
            resetGame();
        }, 5000);
    }
    redCount = 1;
}

function alertYellowWin() {
    if (yellowCount > 3) {
        $("#yellowAlert").text("");
        $("#yellowAlert").text("Yellow has won!");
        yellowWins++;
        clearInterval(intervalId);
        database.ref("/players").update({
            playerCount: 0,
        })
        setTimeout(function () {
            console.log("3");
            resetGame();
        }, 5000);
    }
    yellowCount = 1;
}

function colorize() {
    for (i = 0; i < gameArray.length; i++) {
        for (j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] === "red") {
                $("#" + i + j).addClass("red");
            } else if (gameArray[i][j] === "yellow") {
                $("#" + i + j).addClass("yellow");
            }
        }
    }
}

function resetGame() {
    for (h = 0; h < gameArray.length; h++) {
        for (l = 0; l < gameArray[h].length; l++) {
            gameArray[h][l] = "blank";
            $(".circle").removeClass("red");
            $(".circle").removeClass("yellow");
        }
    }
    playerCount = 0;
    redMoves = 0;
    yellowMoves = 0;
    userColor = "";
    redCount = 1;
    yellowCount = 1;
    $(".playButton").removeClass("hide");
    $("#redAlert").text("");
    $("#yellowAlert").text("");
    database.ref("/array").update({
        gameArray: blankArray
    })
    database.ref("/wins").update({
        redWins: redWins
    });
    database.ref("/wins").update({
        yellowWins: yellowWins
    })
    database.ref("/players").update({
        playerCount: playerCount
    })
    database.ref().update({
        redMoves: 0,
        yellowMoves: 0,
        redPlayer: false,
        yellowPlayer: false
    });
    clearInterval(intervalId);
    timeRemaining = 30;
}

function decrement() {
    if (totalMoves !== redMoves + yellowMoves) {
        timeRemaining = 30;
    }
    totalMoves = redMoves + yellowMoves;
    timeRemaining--;
    if (redMoves === yellowMoves) {
        $("#redTimeDisplay").html("<h2>Time Remaining: " + timeRemaining + " seconds</h2>")
        $("#redTimeDisplay").removeClass("hide");
        $("#yellowTimeDisplay").addClass("hide");
    } else {
        $("#yellowTimeDisplay").html("<h2>Time Remaining: " + timeRemaining + " seconds</h2>")
        $("#yellowTimeDisplay").removeClass("hide");
        $("#redTimeDisplay").addClass("hide");
    }
    if (timeRemaining === 0) {
        clearInterval(intervalId);
        if (redMoves === yellowMoves) {
            yellowWins++;
            clearInterval(intervalId);
            database.ref("/players").update({
                playerCount: 0,
            })
            $("#redAlert").text("Red has lost!");
            $("#yellowAlert").text("Yellow has won!");
        } else {
            redWins++;
            clearInterval(intervalId);
            database.ref("/players").update({
                playerCount: 0,
            })
            $("#redAlert").text("Red has won!");
            $("#yellowAlert").text("Yellow has lost!");
        }
        setTimeout(function () {
            console.log("4");
            resetGame();
        }, 5000);
    }
}

function resetInterval() {
    clearInterval(intervalId);
    timeRemaining = 30;
    intervalId = setInterval(decrement, 1000);
}

$(".playButton").on("click", function () {
    userColor = $(this).attr("data-color");
    if (userColor === "red") {
        database.ref().update({
            redPlayer: true
        });
    } else {
        database.ref().update({
            yellowPlayer: true
        })
    }
    database.ref("/players").update({
        playerCount: playerCount + 1
    })
    $(".playButton").addClass("hide");
})

$(".circle").on("click", function () {
    $("#redAlert").text("");
    $("#yellowAlert").text("");
    var thisRow = parseInt($(this).attr("data-row"));
    var thisColumn = parseInt($(this).attr("data-column"));
    var rowBelow = thisRow - 1;
    if (playerCount > 1) {
        if (userColor === "red") {
            if (redMoves === yellowMoves) {
                if (thisRow === 0 && gameArray[thisRow][thisColumn] === "blank") {
                    totalMoves = redMoves + yellowMoves;
                    resetInterval();
                    gameArray[thisRow][thisColumn] = "red";
                    $(this).addClass("red");
                    calcWin(userColor, thisRow, thisColumn);
                    redMoves++;
                    database.ref().update({
                        redMoves: redMoves
                    })
                    database.ref("/array").update({
                        gameArray: gameArray
                    })
                } else if (gameArray[rowBelow][thisColumn] !== "blank" && gameArray[thisRow][thisColumn] === "blank") {
                    totalMoves = redMoves + yellowMoves;
                    resetInterval();
                    gameArray[thisRow][thisColumn] = "red";
                    $(this).addClass("red");
                    calcWin(userColor, thisRow, thisColumn);
                    redMoves++;
                    database.ref().update({
                        redMoves: redMoves
                    })
                    database.ref("/array").update({
                        gameArray: gameArray
                    })
                } else {
                    $("#redAlert").text("");
                    $("#redAlert").text("You can't move there!");
                }
            } else {
                $("#redAlert").text("");
                $("#redAlert").text("It's not your turn!")
            }
        }
        if (userColor === "yellow") {
            if (redMoves === yellowMoves + 1) {
                if (thisRow === 0 && gameArray[thisRow][thisColumn] === "blank") {
                    totalMoves = redMoves + yellowMoves;
                    resetInterval();
                    gameArray[thisRow][thisColumn] = "yellow";
                    $(this).addClass("yellow");
                    calcWin(userColor, thisRow, thisColumn);
                    yellowMoves++;
                    database.ref().update({
                        yellowMoves: yellowMoves
                    })
                    database.ref("/array").update({
                        gameArray: gameArray
                    })
                } else if (gameArray[rowBelow][thisColumn] !== "blank" && gameArray[thisRow][thisColumn] === "blank") {
                    totalMoves = redMoves + yellowMoves;
                    resetInterval();
                    gameArray[thisRow][thisColumn] = "yellow";
                    $(this).addClass("yellow");
                    calcWin(userColor, thisRow, thisColumn);
                    yellowMoves++;
                    database.ref().update({
                        yellowMoves: yellowMoves
                    })
                    database.ref("/array").update({
                        gameArray: gameArray
                    })
                } else {
                    $("#yellowAlert").text("");
                    $("#yellowAlert").text("You can't move there!");
                }
            } else {
                $("#yellowAlert").text("");
                $("#yellowAlert").text("It's not your turn!!")
            }
        }
    } else {
        if (userColor !== "red" && userColor !== "yellow") {
            if (playerCount > 1) {
                alert("You must wait for this game to finish before playing!");
            } else {
                alert("You must choose a color before playing!");
            }
        }
        if (userColor === "red") {
            $("#redAlert").text("You have no opponent!");
        } else if (userColor === "yellow") {
            $("#yellowAlert").text("You have no opponent");
        }
    }
});

$("#reset").on("click", function () {
    clearInterval(intervalId);
    console.log("5");
    resetGame();
});

database.ref("/players").on("value", function (snapshot) {
    console.log("players");
    if (snapshot.child("playerCount").exists()) {
        playerCount = snapshot.val().playerCount;
        if (playerCount === 2) {
            intervalId = setInterval(decrement, 1000);
        }
    }
});

database.ref().on("value", function (snapshot) {
    console.log("value");
    $("#redAlert").text("");
    $("#yellowAlert").text("");
    if (snapshot.val().redPlayer === true) {
        $("#red").addClass("hide");
    } else if (snapshot.val().redPlayer === false && userColor === "") {
        $("#red").removeClass("hide");
    }
    if (snapshot.val().yellowPlayer === true) {
        $("#yellow").addClass("hide");
    } else if (snapshot.val().yellowPlayer === false && userColor === "") {
        $("#yellow").removeClass("hide");
    }
    redMoves = snapshot.val().redMoves;
    yellowMoves = snapshot.val().yellowMoves;
});

database.ref("/wins").on("value", function (snapshot) {
    console.log("wins");
    redWins = snapshot.val().redWins;
    yellowWins = snapshot.val().yellowWins;
    $("#redWins").text("Red Wins: " + snapshot.val().redWins);
    $("#yellowWins").text("Yellow Wins: " + snapshot.val().yellowWins);
//     if (userColor === "red" || userColor === "yellow") {
//     setTimeout(function () {
//         resetGame();
//     }, 5000);
// }
})

database.ref("/array").on("value", function (snapshot) {
    if (snapshot.child("gameArray").exists()) {
        console.log("array");
        gameArray = snapshot.val().gameArray;
        colorize();
    }
})

database.ref().once("value", function (snapshot) {
    console.log("once");
    gameArray = snapshot.val().array.gameArray;
    playerCount = snapshot.val().players.playerCount;
    redMoves = snapshot.val().redMoves;
    yellowMoves = snapshot.val().yellowMoves;
    colorize();
    redWins = snapshot.val().wins.redWins;
    yellowWins = snapshot.val().wins.yellowWins;
    $("#redWins").text("Red Wins: " + snapshot.val().wins.redWins);
    $("#yellowWins").text("Yellow Wins: " + snapshot.val().wins.yellowWins);
    if (snapshot.val().redPlayer === true) {
        $("#red").addClass("hide");
    } else if (snapshot.val().redPlayer === false && userColor === "") {
        $("#red").removeClass("hide");
    }
    if (snapshot.val().yellowPlayer === true) {
        $("#yellow").addClass("hide");
    } else if (snapshot.val().yellowPlayer === false && userColor === "") {
        $("#yellow").removeClass("hide");
    }
})

if (playerCount > 1) {
    $(".playButton").addClass("hide");
} else {
    $(".playButton").removeClass("hide");
}

$("#chatButton").on("click", function() {
    var message = $("#chatInput").val();
    if (userColor === "red") {
    database.ref("/chat").push({
        message: "Red Player: " + message
    });
} else if (userColor === "yellow") {
    database.ref("/chat").push({
        message: "Yellow Player: " + message
    });
} else {
    database.ref("/chat").push({
        message: "Spectator: " + message
    });
}
    $("#chatInput").val("");
});

database.ref("/chat").on("child_added", function(childSnapshot) {
    var message = childSnapshot.val().message
    $("#messages").append("<p>" + message + "</p>");
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
});