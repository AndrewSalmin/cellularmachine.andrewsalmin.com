"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let side = 10;
let gap = 1;

canvasCalculation();

let fieldHeight;
let fieldWidth;
let field;
let tempField;
let age;
let initialFill = 0.43;
let minFill = 0.03;
let maxFill = 0.43;
let currentFill;
let cellsCount = 0;
let capacity;
let generations = 0;
let mode = "day&night";

fieldDefinition();

setInterval(go, 50);

function canvasCalculation() {
    canvas.width = window.innerWidth - window.innerWidth % (side + gap) - gap;
    canvas.height = window.innerHeight - window.innerHeight % (side + gap) - gap;
}

function fieldDefinition() {
    fieldHeight = (canvas.height + gap) / (side + gap);
    fieldWidth = (canvas.width + gap) / (side + gap);

    /*
    field = new Array(fieldHeight);
    for (let i = 0; i < fieldHeight; i++) {
        field[i] = new Array(fieldWidth);
    }
    tempField = new Array(fieldHeight);
    for (let i = 0; i < fieldHeight; i++) {
        tempField[i] = new Array(fieldWidth);
    }
    */
    /*
    field = [];
    for (let i = 0; i < fieldHeight; i++) {
        field.push(new Array(fieldWidth));
    }
    tempField = [];
    for (let i = 0; i < fieldHeight; i++) {
        tempField.push(new Array(fieldWidth));
    }
    */

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

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (Math.random() < initialFill) {
                field[i][j] = 1;
            } else {
                field[i][j] = 0;
            }
        }
    }

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                age[i][j] = 0;
            }
        }
    }

    //alive cells drawing
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                ctx.fillRect(j * (side + gap), i * (side + gap), side, side);
            }
        }
    }

    //alive cells counting
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                cellsCount++;
            }
        }
    }

    capacity = fieldHeight * fieldWidth;

    generations++;

    currentFill = cellsCount / capacity;
    document.title = Math.round(currentFill * 1000) / 10 + " %";
}

function go() {
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            tempField[i][j] = field[i][j];
        }
    }

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            let count = 0;

            if (i != 0 && j != 0 && field[i - 1][j - 1] == 1) {
                count++;
            }
            if (i != 0 && field[i - 1][j] == 1) {
                count++;
            }
            if (i != 0 && j != fieldWidth - 1 && field[i - 1][j + 1] == 1) {
                count++;
            }
            if (j != 0 && field[i][j - 1] == 1) {
                count++;
            }
            if (j != fieldWidth - 1 && field[i][j + 1] == 1) {
                count++;
            }
            if (i != fieldHeight - 1 && j != 0 && field[i + 1][j - 1] == 1) {
                count++;
            }
            if (i != fieldHeight - 1 && field[i + 1][j] == 1) {
                count++;
            }
            if (i != fieldHeight - 1 && j != fieldWidth - 1 && field[i + 1][j + 1] == 1) {
                count++;
            }

            if (mode == "day&night") {
                if (currentFill < minFill) {
                    mode = "B34/S345"
                }
            } else {
                if (currentFill > maxFill) {
                    mode = "day&night"
                }
            }

            if (mode == "day&night") {
                //day & night
                if (field[i][j] == 0) {
                    if (count == 3 || count >= 6) {
                        tempField[i][j] = 1;
                    }
                } else {
                    if (count <= 2 || count == 5) {
                        tempField[i][j] = 0;
                    }
                }
            } else {
                //B34/S34678
                if (field[i][j] == 0) {
                    if (count == 3 || count == 4) {
                        tempField[i][j] = 1;
                    }
                } else {
                    if (count <= 2 || count = 5) {
                        tempField[i][j] = 0;
                    }
                }
            }

            //conway
            /*if (field[i][j] == 0) {
                if (count == 3) {
                    tempField[i][j] = 1;
                }
            } else {
                if (count <= 1 || count >= 4) {
                    tempField[i][j] = 0;
                }
            }*/

            //B34/S345
            /*if (field[i][j] == 0) {
                if (count == 3 || count == 4) {
                    tempField[i][j] = 1;
                }
            } else {
                if (count <= 2 || count >= 6) {
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

    //field drawing
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    generations++;

    //alive cells counting
    cellsCount = 0;
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                cellsCount++;
            }
        }
    }

    currentFill = cellsCount / capacity;
    document.title = Math.round(currentFill * 1000) / 10 + " %";
}
