document.addEventListener('DOMContentLoaded', function() {


    let grid = document.querySelector('.container');
    let slider = document.querySelector(`#sliderInput`);

    document.querySelector(`.sliderValue`).innerHTML = slider.value;

    slider.addEventListener('input', function() {    // when sliders value is changed
        document.querySelector(`.sliderValue`).innerHTML = slider.value;

        for(let i = 0; i < slider.value; i++) {
            let row = document.createElement('div');
            row.classList.add(`row-${i}`);
            for(let j = 0; j < slider.value; j++) {
                index = document.createElement('div');
                index.classList.add(`draw-node`);
                index.classList.add(`${i}${j}`);
                row.appendChild(index);
            }
            grid.appendChild(row);
        }

    })



})


// needed - reset, colorful, black, invert, blur