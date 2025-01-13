
const imageCards = document.getElementById('imageCards');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const items = imageCards.getElementsByClassName('item');

const scrollAmount = imageCards.clientWidth / 3;

previous.addEventListener('click', () => {
    imageCards.scrollLeft -= scrollAmount;
    updateFocus();
});

next.addEventListener('click', () => {
    imageCards.scrollLeft += scrollAmount;
    updateFocus();
});

// Add event listener for scrolling
imageCards.addEventListener('scroll', () => {
    updateFocus();
});


// Add click event listeners to each item 
Array.from(items).forEach(item => { 
    item.addEventListener('click', () => { 
        const itemCenter = item.offsetLeft + item.offsetWidth / 2; 
        const containerCenter = imageCards.clientWidth / 2; 
        const scrollTo = itemCenter - containerCenter; 
        imageCards.scrollLeft = scrollTo; 
        updateFocus(); 
    }); 
});

function updateFocus() {
    const center = imageCards.scrollLeft + imageCards.clientWidth / 1.8;
    let closestItem = null;
    let closestDistance = Infinity;
    

    Array.from(items).forEach(item => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }

        const scale = 1 - Math.min(0.7, distance / 500);
        item.style.transform = `scale(${scale})`;
        item.style.opacity = scale;
        item.style.zIndex = 1; // Default z-index for all items
    });

    // Remove 'focused' class from all items
    Array.from(items).forEach(item => item.classList.remove('focused'));

    // Add 'focused' class to the closest item and make it larger 
    if (closestItem) { 
        closestItem.classList.add('focused'); 
        closestItem.style.transform = `scale(1.5)`; // Make focused item larger 
        closestItem.style.opacity = 1; // Ensure opacity is fully set to 1 
        closestItem.style.zIndex = 10; // Higher z-index to bring it on top
        }
}

updateFocus(); // Initial focus
