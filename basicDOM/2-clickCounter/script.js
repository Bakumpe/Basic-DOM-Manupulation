function clickCounter(){
    const clickButton = document.getElementById('clickButton');
    const counter = document.getElementById('counter');
    const resetButton = document.getElementById('resetButton')
    let count = 0;

    clickButton.addEventListener('click', () => {
        count++;
        counter.innerText =  `${count} times`;
    });

    resetButton.addEventListener('click', () => {
        window.location.reload();
    });
}
clickCounter();