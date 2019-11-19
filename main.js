"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let side = 5;
let gap = 1;

canvasCalculation();

let fieldHeight;
let fieldWidth;
let field;
let tempField;

fieldDefinition();

setInterval(go, 100);

function canvasCalculation() {
    canvas.width = window.innerWidth - window.innerWidth % (side + gap) - gap;
    canvas.height = window.innerHeight - window.innerHeight % (side + gap) - gap;
}

function fieldDefinition() {
    fieldHeight = (canvas.height + gap) / (side + gap);
    fieldWidth = (canvas.width + gap) / (side + gap);

    field = new Array(fieldHeight);
    for (let i = 0; i < fieldHeight; i++) {
        field[i] = new Array(fieldWidth);
    }

    tempField = new Array(fieldHeight);
    for (let i = 0; i < fieldHeight; i++) {
        tempField[i] = new Array(fieldWidth);
    }

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            field[i][j] = Math.round(Math.random());
        }
    }

    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                ctx.fillRect(j * (side + gap), i * (side + gap), side, side);
            }
        }
    }
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
        }
    }

    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            field[i][j] = tempField[i][j];
        }
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < fieldHeight; i++) {
        for (let j = 0; j < fieldWidth; j++) {
            if (field[i][j] == 1) {
                ctx.fillRect(j * (side + gap), i * (side + gap), side, side);
            }
        }
    }
}