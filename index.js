document.addEventListener('DOMContentLoaded', function() {
    
    // loading the DOM into the file
    let container = document.querySelector('.container');
    let slider = document.querySelector(`#sliderInput`);
    let previousValue = slider.value

    // iniitial setup 
    document.querySelector(`.sliderValue`).innerHTML = slider.value;
    makeGrid(1);
    selectBlack();
    selectReset()

    // if slider is changed
    slider.addEventListener('input', function() {    // when sliders value is changed
        document.querySelector(`.sliderValue`).innerHTML = slider.value;
        makeGrid();
        selection(document.querySelector(`#selected`));
        previousValue = slider.value
    })

    // if options are clicked
    document.querySelector(`.black`).onclick = selectBlack;
    document.querySelector(`.random`).onclick = selectRandom;
    document.querySelector(`.custom`).onclick = selectCustom;
    document.querySelector(`.reset`).onclick = selectReset;
















    // functions

    function makeGrid(flag = 0) {    // makes the grid for the selected range
        value = slider.value
        let previousGrid = document.querySelector(`#grid-holder`);
        if (flag === 0) {
            if (parseInt(previousGrid.className) < value) { // adds in the grid
                for (let i = 1; i <= parseInt(previousGrid.className); i++) {  // adds extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    for(let j = parseInt(previousGrid.className) + 1; j <= value; j++) {
                        cell = document.createElement('div');
                        cell.classList.add(`node-${i - 1}${j - 1}`);
                        existingRow.appendChild(cell);    // appends the cells in the row
                    }
                }
                for (let i = parseInt(previousGrid.className) + 1; i <= value; i++) {  // adds extra rows
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

            } else if (parseInt(previousGrid.className) > value) {    // removes from the grid
                for (let i = 1; i < parseInt(previousGrid.className); i++) {  // removes extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    let lastCell = existingRow.querySelector(`.node-${i - 1}${parseInt(previousGrid.className) - 1}`);
                    lastCell.remove();
                }
                for (let i = parseInt(previousGrid.className); i > value; i--) {  // adds extra rows
                    previousGrid.querySelector(`.row-${i}`).remove();
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
    }

    function selectBlack() {    // fills black when cells are clicked
        let previousSelected = document.querySelector(`#selected`);
        if (previousSelected) previousSelected.id = null;
        document.querySelector(`.black`).id = `selected`;
        let grid = document.querySelector(`#grid-holder`);
        if (grid) {
            grid.querySelectorAll(`div`).forEach(function(row) {
                row.querySelectorAll(`div`).forEach(function(cell) {
                    cell.onclick = function() {
                        if (cell.style.backgroundColor !== `white`) makeWhite(cell);
                        else cell.style.backgroundColor = `black`;
                    }
                })
            })
        }
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
        if (grid) {
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
    }

    function selectReset() {
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

    function makeWhite(cell) {
        cell.style.backgroundColor = `white`;
    }

})

// there is a glitch in the slider make grid when numbers are skipped in the slider
// needed - invert, blur, erase, removeBorders 