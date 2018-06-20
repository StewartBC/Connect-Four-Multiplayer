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


// main game array
var gameArray = [
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"]
];

// array of blanks to help restart the game
var blankArray = [
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank"]
];

// variable declarations
var redMoves = 0;
var yellowMoves = 0;
var redWins = 0;
var yellowWins = 0;
var redCount = 1;
var yellowCount = 1;
var userColor = "";
var playerCount = 0;
var timeRemaining = 30;
var intervalId;
var totalMoves = 0;
var filledSpaces = 0;
var redMessage;
var yellowMessage;
var playerCountOnLoad = 0;
var allowMoves = false;

// set of 8 functions, 4 for each color, used to calculate all possible win conditions
function calcRedWinVert(row, column) {
    redCount = 1;
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
    return redCount;
}

function calcYellowWinVert(row, column) {
    yellowCount = 1;
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
    return yellowCount;
}

function calcRedWinHoriz(row, column) {
    redCount = 1;
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
    return redCount;
}

function calcYellowWinHoriz(row, column) {
    yellowCount = 1;
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
    return yellowCount;
}

function calcRedWinDiagUp(row, column) {
    redCount = 1;
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
    return redCount;
}

function calcYellowWinDiagUp(row, column) {
    yellowCount = 1;
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
    return yellowCount;
}

function calcRedWinDiagDown(row, column) {
    redCount = 1;
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
            if (row !== 1 && column !== 4 && gameArray[row - 2][column + 2] === "red") {
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
    return redCount;
}

function calcYellowWinDiagDown(row, column) {
    yellowCount = 1;
    if (row !== 5 && column !== 0 && gameArray[row + 1][column - 1] === "yellow") {
        yellowCount++;
        if (row !== 4 && column !== 1 && gameArray[row + 2][column - 2] === "yellow") {
            yellowCount++;
            if (row !== 3 && column !== 2 && gameArray[row + 3][column - 3] === "yellow") {
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
    return yellowCount;
}

// functions that call the above functions and then check the current count (how many in a row), calls next function if no win is found
function calcRedWin(row, column) {
    if (calcRedWinVert(row, column) > 3) {
        alertRedWin();
    } else if (calcRedWinHoriz(row, column) > 3) {
        alertRedWin();
    } else if (calcRedWinDiagUp(row, column) > 3) {
        alertRedWin();
    } else if (calcRedWinDiagDown(row, column) > 3) {
        alertRedWin();
    }
}

function calcYellowWin(row, column) {
    if (calcYellowWinVert(row, column) > 3) {
        alertYellowWin();
    } else if (calcRedWinHoriz(row, column) > 3) {
        alertYellowWin();
    } else if (calcRedWinDiagUp(row, column) > 3) {
        alertYellowWin();
    } else if (calcRedWinDiagDown(row, column) > 3) {
        alertYellowWin();
    }
}

function calcWin(color, row, column) {
    if (color === "red") {
        calcRedWin(row, column);
    } else if (color === "yellow") {
        calcYellowWin(row, column);
    }
    for (i = 0; i < gameArray.length; i++) {
        for (j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] === "red" || gameArray[i][j] === "yellow") {
                filledSpaces++;
            }
        }
        if (filledSpaces === 42) {
            console.log("tie");
            clearInterval(intervalId);
            alert("The match is a tie!");
            setTimeout(function () {
                resetGame();
            }, 5000);
        }
    }
    filledSpaces = 0;
}

// functions that are called when a win occurs
function alertRedWin() {
    console.log("red win");
    database.ref("/redText").update({
        redText: "Red has won!"
    })
    clearInterval(intervalId);
    database.ref("/wins").update({
        redWins: redWins + 1
    })
    setTimeout(function () {
        resetGame();
    }, 5000);
}

function alertYellowWin() {
    console.log("yellow win");
    database.ref("/yellowText").update({
        yellowText: "Yellow has won!"
    })
    clearInterval(intervalId);
    database.ref("/wins").update({
        yellowWins: yellowWins + 1
    })
    setTimeout(function () {
        resetGame();
    }, 5000);
}

// function to add color to the circles
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

// function to reset the game
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
    database.ref("/redText").update({
        redText: ""
    })
    database.ref("/yellowText").update({
        yellowText: ""
    })
    database.ref("/array").update({
        gameArray: blankArray
    })
    database.ref("/players").update({
        playerCount: 0
    })
    database.ref("/redMoves").update({
        redMoves: 0
    })
    database.ref("/yellowMoves").update({
        yellowMoves: 0
    })
    database.ref("/redPlayer").update({
        redPlayer: false,
    });
    database.ref("/yellowPlayer").update({
        yellowPlayer: false,
    });
    clearInterval(intervalId);
    timeRemaining = 30;
}

// function to keep track of the turn timer (30 seconds)
function decrement() {
    // there was a bug where the time did not reset after your opponent's move, this somehow worked (see lines 529, 542, 564, 577)
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
            clearInterval(intervalId);
            database.ref("/wins").update({
                yellowWins: yellowWins + 1
            })
            database.ref("/players").update({
                playerCount: 0,
            })
            database.ref("/redText").update({
                redText: "Red has lost!"
            })
            database.ref("/yellowText").update({
                yellowText: "Yellow has won!"
            })
        } else {
            clearInterval(intervalId);
            database.ref("/wins").update({
                redWins: redWins + 1
            })
            database.ref("/players").update({
                playerCount: 0,
            })
            database.ref("/redText").update({
                redText: "Red has won!"
            })
            database.ref("/yellowText").update({
                yellowText: "Yellow has lost!"
            })
        }
    }
}

// function to clear interval
function resetInterval() {
    clearInterval(intervalId);
    timeRemaining = 30;
    intervalId = setInterval(decrement, 1000);
}


// click listener for the play buttons
$(".playButton").on("click", function () {
    allowMoves = true;
    userColor = $(this).attr("data-color");
    if (userColor === "red") {
        database.ref("/redPlayer").update({
            redPlayer: true
        });
    } else {
        database.ref("/yellowPlayer").update({
            yellowPlayer: true
        })
    }
    database.ref("/players").update({
        playerCount: playerCount + 1
    })
    $(".playButton").addClass("hide");
})


// click listener for clicking a circle, followed by numerous checks to ensure only correct moves by the correct player can be made
$(".circle").on("click", function () {
    if (userColor !== "red" && userColor !== "yellow") {
        if (playerCount > 1) {
            alert("You must wait for this game to finish before playing!");
            colorize();
        } else {
            alert("You must choose a color before playing!");
        }
    }
    var thisRow = parseInt($(this).attr("data-row"));
    var thisColumn = parseInt($(this).attr("data-column"));
    var rowBelow = thisRow - 1;
    if (userColor === "red" || userColor === "yellow") {
        database.ref("/redText").update({
            redText: ""
        })
        database.ref("/yellowText").update({
            yellowText: ""
        })
        if (playerCount > 1) {
            if (userColor === "red") {
                if (redMoves === yellowMoves && allowMoves === true) {
                    if (gameArray[thisRow][thisColumn] === "red" || gameArray[thisRow][thisColumn] === "yellow") {
                        console.log("u cant");
                        database.ref("/redText").update({
                            redText: "You can't move there!"
                        })
                    } else if (thisRow === 0 && gameArray[thisRow][thisColumn] === "blank") {
                        totalMoves = redMoves + yellowMoves;
                        resetInterval();
                        gameArray[thisRow][thisColumn] = "red";
                        $(this).addClass("red");
                        calcWin(userColor, thisRow, thisColumn);
                        redMoves++;
                        database.ref("/redMoves").update({
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
                        database.ref("/redMoves").update({
                            redMoves: redMoves
                        })
                        database.ref("/array").update({
                            gameArray: gameArray
                        })
                    } else {
                        database.ref("/redText").update({
                            redText: "You can't move there!"
                        })
                    }
                } else {
                    database.ref("/redText").update({
                        redText: "It's not your turn!!"
                    })
                }
            }
            if (userColor === "yellow") {
                if (redMoves === yellowMoves + 1 && allowMoves === true) {
                    if (gameArray[thisRow][thisColumn] === "red" || gameArray[thisRow][thisColumn] === "yellow") {
                        database.ref("/yellowText").update({
                            yellowText: "You can't move there!"
                        })
                    } else if (thisRow === 0 && gameArray[thisRow][thisColumn] === "blank") {
                        totalMoves = redMoves + yellowMoves;
                        resetInterval();
                        gameArray[thisRow][thisColumn] = "yellow";
                        $(this).addClass("yellow");
                        calcWin(userColor, thisRow, thisColumn);
                        yellowMoves++;
                        database.ref("/yellowMoves").update({
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
                        database.ref("/yellowMoves").update({
                            yellowMoves: yellowMoves
                        })
                        database.ref("/array").update({
                            gameArray: gameArray
                        })
                    } else {
                        database.ref("/yellowText").update({
                            yellowText: "You can't move there!"
                        })
                    }
                } else {
                    database.ref("/yellowText").update({
                        yellowText: "It's not your turn!!"
                    })
                }
            }
        } else {
            alert("You have no opponent!")
        }
    }

});

// chat button click listener
$("#chatButton").on("click", function () {
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

// firebase value listeners
database.ref("/players").on("value", function (snapshot) {
    for (h = 0; h < gameArray.length; h++) {
        for (l = 0; l < gameArray[h].length; l++) {
            gameArray[h][l] = "blank";
            $(".circle").removeClass("red");
            $(".circle").removeClass("yellow");
        }
    }
    if (snapshot.child("playerCount").exists()) {
        playerCount = snapshot.val().playerCount;
        if (playerCount === 2) {
            intervalId = setInterval(decrement, 1000);
        }
    }
});

database.ref("/redMoves").on("value", function (snapshot) {
    redMoves = snapshot.val().redMoves;
    redMovesOnLoad = snapshot.val().redMoves;
})

database.ref("/yellowMoves").on("value", function (snapshot) {
    yellowMoves = snapshot.val().yellowMoves;
    yellowMovesOnLoad = snapshot.val().yellowMoves;
})

database.ref("/redPlayer").on("value", function (snapshot) {
    if (snapshot.val().redPlayer === true) {
        $("#red").addClass("hide");
    } else if (snapshot.val().redPlayer === false && userColor === "") {
        $("#red").removeClass("hide");
    }
})

database.ref("/yellowPlayer").on("value", function (snapshot) {
    if (snapshot.val().yellowPlayer === true) {
        $("#yellow").addClass("hide");
    } else if (snapshot.val().yellowPlayer === false && userColor === "") {
        $("#yellow").removeClass("hide");
    }
})

database.ref("/redText").on("value", function (snapshot) {
    redMessage = snapshot.val().redText;
    $("#redAlert").html("<h6>" + redMessage + "</h6>")
});

database.ref("/yellowText").on("value", function (snapshot) {
    yellowMessage = snapshot.val().yellowText;
    $("#yellowAlert").html("<h6>" + yellowMessage + "</h6>")
});


database.ref("/wins").on("value", function (snapshot) {
    allowMoves = false;
    $("#redTimeDisplay").addClass("hide");
    $("#yellowTimeDisplay").addClass("hide");
    if (userColor === "") {
        for (h = 0; h < gameArray.length; h++) {
            for (l = 0; l < gameArray[h].length; l++) {
                gameArray[h][l] = "blank";
                $(".circle").removeClass("red");
                $(".circle").removeClass("yellow");
            }
        }
        clearInterval(intervalId);
        timeRemaining = 30;
    }

    redWins = snapshot.val().redWins;
    yellowWins = snapshot.val().yellowWins;
    $("#redWins").html("<h6>Red Wins:<br>" + snapshot.val().redWins + "</h6>");
    $("#yellowWins").html("<h6>Yellow Wins:<br>" + snapshot.val().yellowWins + "</h6>");
    setTimeout(function () {
        database.ref("/redText").update({
            redText: ""
        })
        database.ref("/yellowText").update({
            yellowText: ""
        })

    }, 5000)
    clearInterval(intervalId);
    if (userColor === "red" || userColor === "yellow") {
        setTimeout(function () {
            resetGame();
        }, 5000);
    }
})

database.ref("/array").on("value", function (snapshot) {
    resetCheck();
    gameArray = snapshot.val().gameArray;
    colorize();
})

database.ref("/chat").on("child_added", function (childSnapshot) {
    var message = childSnapshot.val().message
    $("#messages").append("<p>" + message + "</p>");
    var elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
});


// resets the game after 31 seconds if a spectator joins during a game in which both players left
function resetCheck() {
    var startMoves = redMoves + yellowMoves;
    var startWins = redWins + yellowWins;
    var startPlayerCount = playerCount;
    setTimeout(function () {
        if (startMoves === redMoves + yellowMoves && startWins === redWins + yellowWins && startPlayerCount === playerCount) {
            resetGame();
        }
    }, 31000)
}

// conditional statement for when a spectator joins to hide the play buttons, possibly unneccesary
if (playerCount > 1) {
    $(".playButton").addClass("hide");
} else {
    $(".playButton").removeClass("hide");
}

// append the time display
$("#redTimeDisplay").html("<h2>Time Remaining: " + timeRemaining + " seconds</h2>");