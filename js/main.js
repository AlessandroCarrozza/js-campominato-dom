
// collegamenti con il DOM 
const btnPlayDom = document.getElementById("btn-play");
const levelDom = document.getElementById("level");
const gridDom = document.getElementById("grid");
const titlePointsDom = document.getElementById("title-points");
const titleLevelDom = document.getElementById("title-level");


// variabili globali
let bombList = [];
let gameOver = false;
let cells;
let punteggio = 0;


btnPlayDom.addEventListener("click" , function () {

        titlePointsDom.innerHTML = `Punteggio: ${punteggio}`;

        gameOver = false;

        titleLevelDom.classList.add("d-none");
        titlePointsDom.classList.remove("d-none");

        const level = levelDom.value;
        createNewGame(level);

        bombList = [];

        for (let i = 1; i <= 16; i++) {

            const newValidRandomNumber = generateUniqueRandomNumber(bombList, 1, cells);
            bombList.push(newValidRandomNumber);
        }

        console.log(bombList);


});



// function per impostare il numero di celle in base al livello selezionato
function createNewGame (level) {
    punteggio = 0;
    
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

    generatePlayground(cells, cellPerSide, punteggio);
}


// function per la generazione delle celle
function generatePlayground (cellNumber, cellPerSide, points) {

    gridDom.innerHTML = "";
    

    for (let i = 1; i <= cellNumber; i++) {
        const currentCell = createCells(cellPerSide, i);
        currentCell.addEventListener("click" , function () {
            if (gameOver == false) {
                if (bombList.includes(i)) {
                    gameOver = true;
                    this.classList.add("clicked-bomb");
                    titlePointsDom.innerHTML = `Hai perso con un punteggio di: ${points}`;               
                } else {
                    ++points;
                    titlePointsDom.innerHTML = `Punteggio: ${points}`;
                    this.classList.add("clicked");                   
                }
                console.log(i);
            }
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
    cell.innerHTML = `<div>${number}</div>`;
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

