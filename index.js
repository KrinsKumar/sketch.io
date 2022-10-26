document.addEventListener('DOMContentLoaded', function() {
    
    // loading the DOM into the file
    let container = document.querySelector('.container');
    let slider = document.querySelector(`#sliderInput`);
    let previousValue = slider.value;
    previousValue = parseInt(previousValue)

    // iniitial setup 
    document.querySelector(`.sliderValue`).innerHTML = slider.value;
    makeGrid(1);
    selectBlack();    // sets the default mode as black color
    selectReset();    // makes sure that every cell is white

    // if slider is changed
    slider.addEventListener('input', function() {    // when sliders value is changed
        document.querySelector(`.sliderValue`).innerHTML = slider.value;
        makeGrid();
        previousValue = slider.value    // updates the previous grid
        previousValue = parseInt(previousValue)
        selection(document.querySelector(`#selected`));
    })

    // if options are clicked
    document.querySelector(`.black`).onclick = selectBlack;
    document.querySelector(`.random`).onclick = selectRandom;
    document.querySelector(`.custom`).onclick = selectCustom;
    document.querySelector(`.reset`).onclick = selectReset;
    document.querySelector(`.eraser`).onclick = selectEraser;

















    // functions

    function makeGrid(flag = 0) {    // makes the grid for the selected range
        value = parseInt(slider.value);
        let previousGrid = document.querySelector(`#grid-holder`);
        if (flag === 0) {
            console.log(previousValue, value);
            if (previousValue < value) { // adds in the grid
                for (let i = 1; i <= previousValue; i++) {  // adds extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    for(let j =  previousValue + 1; j <= value; j++) {
                        cell = document.createElement('div');
                        cell.classList.add(`node-${i - 1}${j - 1}`);
                        existingRow.appendChild(cell);
                    }
                }
                for (let i = previousValue + 1; i <= value; i++) {  // adds extra rows
                    let row = document.createElement('div');
                    row.classList.add(`row-${i}`);
                    for(let j = 1; j <= value; j++) {
                        cell = document.createElement('div');
                        cell.classList.add(`node-${i - 1}${j - 1}`);
                        row.appendChild(cell);    // appends the cells in the row
                    }
                    previousGrid.appendChild(row);    // appends the whole row in the div
                }
                previousGrid.classList.remove(previousValue);    // updates the class of the container
                previousGrid.classList.add(value);
            } else if (previousValue > value) {    // removes from the grid
                console.log(`yes`);
                for (let i = previousValue; i > value; i--) {  // adds extra rows
                    previousGrid.querySelector(`.row-${i}`).remove();
                }
                for (let i = 1; i <= value; i++) {  // removes extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    for(let j = value + 1; j <= previousValue; j++) { 
                        let lastCell = existingRow.querySelector(`.node-${i - 1}${j - 1}`);
                        lastCell.remove();
                    }
                }
                previousGrid.classList.remove(previousValue);
                previousGrid.classList.add(value);
            }
        } else {
            // makes and adds a brand new grid
            let grid = document.createElement('div');
            grid.id = `grid-holder`;
            for(let i = 1; i <= value; i++) {    // makes the cells
                let row = document.createElement('div');
                row.classList.add(`row-${i}`);
                for(let j = 1; j <= value; j++) {
                    cell = document.createElement('div');
                    cell.classList.add(`node-${i - 1}${j - 1}`);
                    row.appendChild(cell);    // appends the cells in the row
                }
                grid.appendChild(row);    // appends the whole row in the div
            }
            grid.classList.add(value);
            container.appendChild(grid);    // appends the div in the DOM
        } 
    }
    
    function selection(select) {    // calls the selected function again
        if (select.className === `black`) selectBlack(); 
        if (select.className === `random`) selectRandom(); 
        if (select.className === `custom`) selectCustom();
        if (select.className === `eraser`) selectEraser();
    }

    function selectBlack() {    // fills black when cells are clicked
        let previousSelected = document.querySelector(`#selected`);
        if (previousSelected) previousSelected.id = null;
        document.querySelector(`.black`).id = `selected`;
        let grid = document.querySelector(`#grid-holder`);
        grid.querySelectorAll(`div`).forEach(function(row) {
            row.querySelectorAll(`div`).forEach(function(cell) {
                cell.onclick = function() {
                    if (cell.style.backgroundColor !== `white`) makeWhite(cell);
                    else cell.style.backgroundColor = `black`;
                }
            })
        })
    }

    function selectCustom() {
        let previousSelected = document.querySelector(`#selected`);
        if (previousSelected) previousSelected.id = null;
        document.querySelector(`.custom`).id = `selected`;
    }

    function selectRandom() {    // fills random when cells are clicked
        let previousSelected = document.querySelector(`#selected`);
        if (previousSelected) previousSelected.id = null;
        document.querySelector(`.random`).id = `selected`;
        let grid = document.querySelector(`#grid-holder`);
        grid.querySelectorAll(`div`).forEach(function(row) {
            row.querySelectorAll(`div`).forEach(function(cell) {
                cell.onclick = function() {
                    let red = Math.floor(Math.random() * 255);
                    let green = Math.floor(Math.random() * 255);
                    let blue = Math.floor(Math.random() * 255);
                    if (cell.style.backgroundColor !== `white`) makeWhite(cell);
                    else cell.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
                }
            })
        })
    }

    function selectReset() {    // resets the grids
        let grid = document.querySelector(`#grid-holder`);
        if (grid) {
            grid.querySelectorAll(`div`).forEach(function(row) {
                row.querySelectorAll(`div`).forEach(function(cell) {
                    cell.onclick = cell.style.backgroundColor = `white`;
                })
            })
        }
        selection(document.querySelector(`#selected`));
    }

    function selectEraser() {    // makes the cell white when clicked
        let previousSelected = document.querySelector(`#selected`);
        if (previousSelected) previousSelected.id = null;
        document.querySelector(`.eraser`).id = `selected`;
        let grid = document.querySelector(`#grid-holder`);
        grid.querySelectorAll(`div`).forEach(function(row) {
            row.querySelectorAll(`div`).forEach(function(cell) {
                cell.onclick = function() {
                     makeWhite(cell);
                }
            })
        })
    }

    function makeWhite(cell) {
        cell.style.backgroundColor = `white`;
    }

})

// makeGrid is completed now
// needed - invert, blur, erase, removeBorders 