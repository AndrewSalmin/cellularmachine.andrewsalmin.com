"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let side = 5;
let gap = 1;

let fieldHeight;
let fieldWidth;

let field;
let tempField;
let age;

let initialFill = 0.48;
let minFill = 0.03;
let maxFill = 0.48;
let currentFill;

let cellsCount;
let capacity;

let relatedBoundaries = false;

let mode = "day&night";

let generations;

initialization();

setInterval(go, 50);

function initialization() {
    canvas.height = window.innerHeight - window.innerHeight % (side + gap) - gap;
    canvas.width = window.innerWidth - window.innerWidth % (side + gap) - gap;
    //canvas.width = canvas.height;

    fieldHeight = (canvas.height + gap) / (side + gap);
    fieldWidth = (canvas.width + gap) / (side + gap);

    field = [];
    for (let i = 0; i < fieldHeight; i++) {
        field.push([]);
    }
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            field[i].push();
        }
    }

    tempField = [];
    for (let i = 0; i < fieldHeight; i++) {
        tempField.push([]);
    }
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            tempField[i].push();
        }
    }

    age = [];
    for (let i = 0; i < fieldHeight; i++) {
        age.push([]);
    }
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            age[i].push();
        }
    }

    //field determination
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (Math.random() < initialFill) {
                field[i][j] = 1;
            } else {
                field[i][j] = 0;
            }
        }
    }

    //age determination
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                age[i][j] = 0;
            }
        }
    }

    //field drawing
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                ctx.fillRect(j * (side + gap), i * (side + gap), side, side);
            }
        }
    }

    cellsCounting();

    capacity = fieldHeight * fieldWidth;

    currentFillCalculation();

    generations = 1;
}

function go() {
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            tempField[i][j] = field[i][j];
        }
    }

    //neighbors counting
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            let neighbors = 0;

            //up left
            if (i != 0 && j != 0 && field[i - 1][j - 1] == 1) {
                neighbors++;
            }

            //up
            if (i != 0 && field[i - 1][j] == 1) {
                neighbors++;
            }

            //up right
            if (i != 0 && j != fieldWidth - 1 && field[i - 1][j + 1] == 1) {
                neighbors++;
            }

            //left
            if (j != 0 && field[i][j - 1] == 1) {
                neighbors++;
            }

            //right
            if (j != fieldWidth - 1 && field[i][j + 1] == 1) {
                neighbors++;
            }

            //down left
            if (i != fieldHeight - 1 && j != 0 && field[i + 1][j - 1] == 1) {
                neighbors++;
            }

            //down
            if (i != fieldHeight - 1 && field[i + 1][j] == 1) {
                neighbors++;
            }

            //down right
            if (i != fieldHeight - 1 && j != fieldWidth - 1 && field[i + 1][j + 1] == 1) {
                neighbors++;
            }

            if (relatedBoundaries) {
                //top row
                if (i == 0) {
                    if (j == 0) {
                        if (field[fieldHeight - 1][fieldWidth - 1] == 1) {
                            neighbors++;
                        }
                    } else {
                        if (field[fieldHeight - 1][j - 1] == 1) {
                            neighbors++;
                        }
                    }

                    if (field[fieldHeight - 1][j] == 1) {
                        neighbors++;
                    }

                    if (j == fieldWidth - 1) {
                        if (field[fieldHeight - 1][0] == 1) {
                            neighbors++;
                        }
                    } else {
                        if (field[fieldHeight - 1][j + 1] == 1) {
                            neighbors++;
                        }
                    }
                }

                //left column
                if (j == 0) {
                    if (i != 0) {
                        if (field[i - 1][fieldWidth - 1] == 1) {
                            neighbors++;
                        }
                    }

                    if (field[i][fieldWidth - 1] == 1) {
                        neighbors++;
                    }

                    if (i != fieldHeight - 1) {
                        if (field[i + 1][fieldWidth - 1] == 1) {
                            neighbors++;
                        }
                    }
                }

                //right column
                if (j == fieldWidth - 1) {
                    if (i != 0) {
                        if (field[i - 1][0] == 1) {
                            neighbors++;
                        }
                    }

                    if (field[i][0] == 1) {
                        neighbors++;
                    }

                    if (i != fieldHeight - 1) {
                        if (field[i + 1][0] == 1) {
                            neighbors++;
                        }
                    }
                }

                //bottom row
                if (i == fieldHeight - 1) {
                    if (j == 0) {
                        if (field[0][fieldWidth - 1] == 1) {
                            neighbors++;
                        }
                    } else {
                        if (field[0][j - 1] == 1) {
                            neighbors++;
                        }
                    }

                    if (field[0][j] == 1) {
                        neighbors++;
                    }

                    if (j == fieldWidth - 1) {
                        if (field[0][0] == 1) {
                            neighbors++;
                        }
                    } else {
                        if (field[0][j + 1] == 1) {
                            neighbors++;
                        }
                    }
                }
            }

            if (mode == "day&night") {
                //day&night
                if (field[i][j] == 0) {
                    if (neighbors == 3 || neighbors >= 6) {
                        tempField[i][j] = 1;
                    }
                } else {
                    if (neighbors <= 2 || neighbors == 5) {
                        tempField[i][j] = 0;
                    }
                }
            } else {
                //B34/S3478 (max 48 %)
                if (field[i][j] == 0) {
                    if (neighbors == 3 || neighbors == 4) {
                        tempField[i][j] = 1;
                    }
                } else {
                    if (neighbors <= 2 || neighbors == 5 || neighbors == 6) {
                        tempField[i][j] = 0;
                    }
                }
            }

            //conway
            /*if (field[i][j] == 0) {
                if (neighbors == 3) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 1 || neighbors >= 4) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S34 (max 43 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors >= 5) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S348 (max 43 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors == 6 || neighbors == 7) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S347 (max 47 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors == 6 || neighbors == 8) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S3478 (max 48 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors == 6) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S346 (max 52 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors >= 7) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S3468 (max 52 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors == 7) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S3467 (max 54 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5 || neighbors == 8) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S34678 (max 55 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors == 5) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S345 (max 56 %)
            /*if (field[i][j] == 0) {
                if (neighbors == 3 || neighbors == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (neighbors <= 2 || neighbors >= 6) {
                    tempField[i][j] = 0;
                }
            }*/
        }
    }

    //age changing
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 0) {
                if (tempField[i][j] == 1) {
                    age[i][j] = 0;
                }
            } else {
                if (tempField[i][j] == 0) {
                    age[i][j] = undefined;
                } else {
                    if (age[i][j] < 8) {
                        age[i][j]++;
                    }
                }
            }
        }
    }

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            field[i][j] = tempField[i][j];
        }
    }

    //field removing
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //field drawing
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                switch (age[i][j]) {
                    case 0:
                        ctx.fillStyle = "#00FF00"; //green
                        break;
                    case 1:
                        ctx.fillStyle = "#33FF00";
                        break;
                    case 2:
                        ctx.fillStyle = "#66FF00";
                        break;
                    case 3:
                        ctx.fillStyle = "#99FF00";
                        break;
                    case 4:
                        ctx.fillStyle = "#CCFF00";
                        break;
                    case 5:
                        ctx.fillStyle = "#FFFF00"; //yellow
                        break;
                    case 6:
                        ctx.fillStyle = "#FFCC00";
                        break;
                    case 7:
                        ctx.fillStyle = "#FF9900";
                        break;
                    case 8:
                        ctx.fillStyle = "#FF6600"; //orange
                        break;
                }
                ctx.fillRect(j * (side + gap), i * (side + gap), side, side);
            }
        }
    }

    cellsCounting();

    currentFillCalculation();

    if (mode == "day&night") {
        if (currentFill < minFill) {
            mode = "B34/S3478"
        }
    } else {
        if (currentFill > maxFill) {
            mode = "day&night"
        }
    }

    generations++;
}

function cellsCounting() {
    cellsCount = 0;
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                cellsCount++;
            }
        }
    }
}

function currentFillCalculation() {
    currentFill = cellsCount / capacity;
    document.title = Math.round(currentFill * 1000) / 10 + " %";
}
