function wordCounter(){
    const myText = document.getElementById('myText');
    const wordCountDisplay = document.getElementById('counter'); 

    myText.addEventListener('input', () => { 
        const myTextCount = 200 - myText.value.length;
        if (myTextCount == 100){
            const counter = document.getElementById('counter');
            counter.style.backgroundColor = 'Red';
        } 
        wordCountDisplay.innerText = `${myTextCount}`; 
    });
    
}
wordCounter();

