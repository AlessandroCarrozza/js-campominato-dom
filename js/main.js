
// collegamenti con il DOM 
const btnPlayDom = document.getElementById("btn-play");
const levelDom = document.getElementById("level");
const gridDom = document.getElementById("grid");
let pointsDom = document.getElementById("points");

let bombList = [];

let punteggio = 1;

btnPlayDom.addEventListener("click" , function () {

        const level = levelDom.value;
        createNewGame(level);

        bombList = [];

        for (let i = 1; i <= 16; i++) {

            const newValidRandomNumber = generateUniqueRandomNumber(bombList, 1, 100);
            bombList.push(newValidRandomNumber);
        }

        console.log(bombList);


});



// function per impostare il numero di celle in base al livello selezionato
function createNewGame (level) {

    punteggio = 1;
    pointsDom.innerHTML = 0;

    let cells;
    let cellPerSide;

    switch (level) {
        case "easy":
            cells = 100;
            break;
        
        case "medium":
            cells = 81;
            break;
        
        case "hard":
            cells = 49;
            break;
    }

    cellPerSide = Math.sqrt(cells);

    generatePlayground(cells, cellPerSide);
}


// function per la generazione delle celle
function generatePlayground (cellNumber, cellPerSide) {

    gridDom.innerHTML = "";
    

    for (let i = 1; i <= cellNumber; i++) {
        const currentCell = createCells(cellPerSide, i);
        currentCell.addEventListener("click" , function () {
            if (bombList.includes(i)) {
                this.classList.add("clicked-bomb");
            } else {
                this.classList.add("clicked");
                pointsDom.innerHTML = punteggio++;
            }
            console.log(i);
        });
        
        gridDom.append(currentCell);
    }
}


// function per la creazione dell'elemento cella
function createCells (cellPerSide, number) {
    const cell = document.createElement("div");
    cell.classList.add("square");
    cell.style.width = `calc(100% / ${cellPerSide})`;
    cell.style.height = `calc(100% / ${cellPerSide})`;
    cell.innerHTML = `<div class = "cell-number">${number}</div>`;
    return cell;
   
}


// functions per generare un numero casuale unico
function generateUniqueRandomNumber(blacklist, min, max) {

    let isValidNumber = false;
    let randomNumber;

    while (!isValidNumber) {
        randomNumber = generateRandomNumber(min, max);
        if (!blacklist.includes(randomNumber)) {
            isValidNumber = true;
        }
    }

    return randomNumber;

}


function generateRandomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

