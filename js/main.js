
// collegamenti con il DOM 
const btnPlayDom = document.getElementById("btn-play");
const levelDom = document.getElementById("level");
const gridDom = document.getElementById("grid");



btnPlayDom.addEventListener("click" , function () {

        const level = levelDom.value;
        createNewGame(level);

});



// function per impostare il numero di celle in base al livello selezionato
function createNewGame (level) {

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
            this.classList.toggle("clicked");
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