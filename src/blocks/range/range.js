export function getValue () {
    const slider = document.getElementById("range");
    const output = document.getElementById("output");
    output.innerHTML = slider.value + ' %';

    slider.oninput = function() {
        output.innerHTML = this.value + ' %';
    }
}