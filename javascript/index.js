//import { gallery } from `gallery.js`;

document.addEventListener('DOMContentLoaded', function() {
    
    // loading the DOM into the file
    let container = document.querySelector('.container');
    let slider = document.querySelector(`#sliderInput`);
    let previousValue = parseInt(slider.value);
    let selected = 'black';
    let currentColor;
    let patternSelected = false;


    // initial setup 
    document.querySelector(`.sliderValue`).innerHTML = slider.value;
    makeGrid(1);    // dynamically makes the grid
    let grid = document.querySelector(`#grid-holder`);
    addDrawEvent()
    resetTheCells();    // makes sure that every cell is white


    // if slider is changed
    slider.addEventListener('input', sliderChanged);

    // if a cell is clicked
    let mouseDown = false
    document.body.onmousedown = () => (mouseDown = true)
    document.body.onmouseup = () => (mouseDown = false)


    // if a button to change the option is clicked, variable selected is changed
    document.querySelectorAll('.button-color').forEach( function(but) {
        but.onclick = function() {
            let previousSelected = document.querySelector(`#selected`);
            if (previousSelected) {
                previousSelected.removeAttribute('id');
            } 
            selected = but.classList[0];
            document.querySelector(`.${selected}`).id = `selected`;
        }
    })
    document.querySelector(`.reset`).onclick = resetTheCells;
    custom = document.querySelector(`.color-picker`);
    custom.addEventListener('input', function(e) { 
        currentColor = custom.value;
        document.querySelector(`#selected`).style.backgroundColor = currentColor;
        document.querySelector(`#selected`).style.borderColor = currentColor;

        if (isDark(currentColor)) document.querySelector(`.custom`).style.color = `#102542`;
        else document.querySelector(`.custom`).style.color = `#F87060`;
    })
    
    // if border button is pressed
    let border = document.querySelector(`.toggle-borders`);
    border.onclick = function() {
        if (container.id === `not-border`) {
            container.removeAttribute('id');
            border.id = `high`;
        }
        else {
            container.id = `not-border`;
            border.removeAttribute('id');
        }
    }

    // if pattern button is on 
    let patternButton = document.querySelector(`.pattern`);
    patternButton.onclick = function() {
        if (patternSelected === false) {
            patternSelected = true;
            patternButton.id = `pattern-on`
        } else {
            patternSelected = false;
            patternButton.removeAttribute('id');
        }
    }









    // current functions

    



// needed - invert, blur, erase, removeBorders, lighter, darker, pattern



// done functions

    // makes the grid for the selected range

    function sliderChanged() {    // when sliders value is changed
        document.querySelector(`.sliderValue`).innerHTML = slider.value;
        makeGrid();
        previousValue = slider.value    // updates the previous grid
        previousValue = parseInt(previousValue);
        addDrawEvent();
    }

    function makeGrid(flag = 0) {    
        value = parseInt(slider.value);
        let previousGrid = document.querySelector(`#grid-holder`);
        if (flag === 0) {
            if (previousValue < value) { // adds in the grid
                for (let i = 1; i <= previousValue; i++) {  // adds extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    for(let j =  previousValue + 1; j <= value; j++) {
                        cell = document.createElement('div');
                        cell.classList.add(`node-${i - 1}_${j - 1}`);
                        cell.style.backgroundColor = `white`;
                        existingRow.appendChild(cell);
                    }
                }
                for (let i = previousValue + 1; i <= value; i++) {  // adds extra rows
                    let row = document.createElement('div');
                    row.classList.add(`row-${i}`);
                    for(let j = 1; j <= value; j++) {
                        cell = document.createElement('div');
                        cell.classList.add(`node-${i - 1}_${j - 1}`);
                        cell.style.backgroundColor = `white`;
                        row.appendChild(cell);    // appends the cells in the row
                    }
                    previousGrid.appendChild(row);    // appends the whole row in the div
                }
                previousGrid.classList.remove(previousValue);    // updates the class of the container
                previousGrid.classList.add(value);
            } else if (previousValue > value) {    // removes from the grid
                for (let i = previousValue; i > value; i--) {  // adds extra rows
                    previousGrid.querySelector(`.row-${i}`).remove();
                }
                for (let i = 1; i <= value; i++) {  // removes extra cells in existing rows
                    let existingRow = document.querySelector(`.row-${i}`);
                    for(let j = value + 1; j <= previousValue; j++) { 
                        let lastCell = existingRow.querySelector(`.node-${i - 1}_${j - 1}`);
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
                    cell.classList.add(`node-${i - 1}_${j - 1}`);
                    row.appendChild(cell);    // appends the cells in the row
                }
                grid.appendChild(row);    // appends the whole row in the div
            }
            grid.classList.add(value);
            container.appendChild(grid);    // appends the div in the DOM
        } 
    }

    // resets the grids
    function resetTheCells() {    
        let grid = document.querySelector(`#grid-holder`);
        if (grid) {
            grid.querySelectorAll(`div`).forEach(function(row) {
                row.querySelectorAll(`div`).forEach(function(cell) {
                    cell.onclick = cell.style.backgroundColor = `white`;
                })
            })
        }
    }

    // changes the color of the clicked cell
    function changeColor(e) {
        if (e.type === 'mouseover' && !mouseDown) return
        if (selected === `black`) {
            if (patternSelected === true) {
                patternOn(e, `black`);
                return;
            } 
            e.target.style.backgroundColor = `black`;
        } 
        if (selected === `random`) {
            let red = Math.floor(Math.random() * 255);
            let green = Math.floor(Math.random() * 255);
            let blue = Math.floor(Math.random() * 255);
            if (patternSelected === true) {
                patternOn(e, `rgb(${red}, ${blue}, ${green})`);
                return;
            } 
            e.target.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
        }
        if (selected === `custom`) {
            if (patternSelected === true) {
                patternOn(e, currentColor);
                return;
            } 
            e.target.style.backgroundColor = currentColor;
        }
        if (selected === `eraser`) {
            if (patternSelected === true) {
                patternOn(e, `white`);
                return;
            } 
            e.target.style.backgroundColor = `white`;
        }
    }

    function addDrawEvent() {
        grid.querySelectorAll(`div`).forEach(function(row) {
            row.querySelectorAll(`div`).forEach(function(cell) {
                cell.addEventListener('mouseover', changeColor);
                cell.addEventListener('mousedown', changeColor);
            })
        })
    }

    function isDark(hexcolor) {
        hexcolor = hexcolor.replace("#", '')
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? true : false;
    }

    function patternOn(e , color) {
        // makes sure that the slider is an even number
        if (slider.value % 2 !== 0) {
            slider.value++;
            sliderChanged();
        }
        e.target.style.backgroundColor = color;
        let col = e.target.classList[0].split(`_`)[1];
        let row = e.target.classList[0].split(`_`)[0].split(`-`)[1];

        // print the pattern in the opposite side of the same row
        document.querySelector(`.node-${row}_${slider.value - col - 1}`)
            .style.backgroundColor = color;

        // print the pattern on the opposite side of the same column
        document.querySelector(`.node-${slider.value - row - 1}_${col}`)
             .style.backgroundColor = color;

        // print the pattern on the opposite side
        document.querySelector(`.node-${slider.value - row - 1}_${slider.value - col - 1}`)
            .style.backgroundColor = color;
    }

})