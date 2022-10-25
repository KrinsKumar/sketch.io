document.addEventListener('DOMContentLoaded', function() {
    
    // loading the DOM into the file
    let container = document.querySelector('.container');
    let slider = document.querySelector(`#sliderInput`);

    // iniitial setup 
    document.querySelector(`.sliderValue`).innerHTML = slider.value;
    makeGrid();
    selectBlack();

    // if slider is changed
    slider.addEventListener('input', function() {    // when sliders value is changed
        document.querySelector(`.sliderValue`).innerHTML = slider.value;
        makeGrid();
        selection(document.querySelector(`#selected`));
    })

    // if options are clicked
    document.querySelector(`.black`).onclick = selectBlack;
    document.querySelector(`.random`).onclick = selectRandom;
    document.querySelector(`.custom`).onclick = selectCustom;
    document.querySelector(`.reset`).onclick = selectReset;
















    // functions

    function makeGrid(value = slider.value) {    // makes the grid for the selected range
        // removes the previous grid
        let previousGrid = document.querySelector(`#grid-holder`);
        if (previousGrid) {
            if (previousGrid.className > value) { // adds in the grid
                for (let i = int(previousGrid.className); i <= value; i++) {

                }
            } else if (previousGrid.className < value) {    // removes from the grid

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
                    cell.classList.add(`draw-node`);
                    cell.classList.add(`${i}${j}`);
                    row.appendChild(cell);    // appends the cells in the row
                }
                grid.appendChild(row);    // appends the whole row in the div
            }
            grid.classList.add(`${i}`);
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
                        cell.onclick = cell.style.backgroundColor = `black`;
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
                        cell.onclick = cell.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
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

})


// stopped at line 48 was about to add the logic for change in the size of the grid
// needed - invert, blur, erase, removeBorders 