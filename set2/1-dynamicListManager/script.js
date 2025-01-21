function addDeleteButton(listItem){
    const deleteButton = document.createElement('p'); 
    deleteButton.className = 'button'; 
    deleteButton.innerText = 'Delete';

    deleteButton.addEventListener('click', () => {
        // Remove the list item from the DOM
        listItem.remove();

        // Get the current list from localStorage
        let itemList = JSON.parse(localStorage.getItem('My Tasks')) || [];

        // Find the index of the listItem text in the stored items
        const itemIndex = itemList.indexOf(listItem.querySelector('.task-text').innerText);

        // Remove the item from the array if it exists
        if (itemIndex > -1) {
            itemList.splice(itemIndex, 1);
        }

        // Update the localStorage with the modified list
        localStorage.setItem('My Tasks', JSON.stringify(itemList));
    });

    return deleteButton;
}

function addEditButton(listItem){
    const editButton = document.createElement('p');
    editButton.className = 'button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
        const taskText = listItem.querySelector('.task-text');
        const newTask = prompt('Edit your task:', taskText.innerText);
        if (newTask) { 
            taskText.innerText = newTask;
        }
    });
    return editButton;
}

function addTask(){
    const addTask = document.getElementById('addTask');
    const addButton = document.getElementById('addButton');
    const myList = document.getElementById('myList');

    myList.className = 'myList';

    addButton.addEventListener('click', () => {
        const task = addTask.value; 
        if (task) { 
            const listItem = document.createElement('li'); 
            listItem.className = 'list-container';

            const taskText = document.createElement('div'); 
            taskText.className = 'task-text'; 
            taskText.innerText = task;

            const buttonContainer = document.createElement('div'); 
            buttonContainer.className = 'button-container'; 
            buttonContainer.appendChild(addEditButton(listItem)); 
            buttonContainer.appendChild(addDeleteButton(listItem));

            listItem.appendChild(taskText); 
            listItem.appendChild(buttonContainer); 
            myList.appendChild(listItem);

            addTaskToLocalStorage(task);

            addTask.value = ''; 
        };

        loadTasksFromLocalStorage();
    });
    
    function addTaskToLocalStorage(task) { 
        let tasks = JSON.parse(localStorage.getItem('My Tasks')) || []; 
        tasks.push(task); 
        localStorage.setItem('My Tasks', JSON.stringify(tasks)); 
    }
}
addTask();

function loadTasksFromLocalStorage() { 
    let tasks = JSON.parse(localStorage.getItem('My Tasks')) || []; 
    tasks.forEach(task => { 
        const listItem = document.createElement('li'); 
        listItem.className = 'list-container'; 
        const taskText = document.createElement('div'); 
        taskText.className = 'task-text'; 
        taskText.innerText = task; 
        const buttonContainer = document.createElement('div'); 
        buttonContainer.className = 'button-container'; 
        buttonContainer.appendChild(addEditButton(listItem)); 
        buttonContainer.appendChild(addDeleteButton(listItem)); 
        listItem.className = 'list'; 
        listItem.appendChild(taskText); 
        listItem.appendChild(buttonContainer); 
        myList.appendChild(listItem);
    }); 
}

// Call the loadTasksFromLocalStorage function whenever the page refreshes
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
