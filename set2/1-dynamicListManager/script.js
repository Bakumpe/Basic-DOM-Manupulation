function addDeleteButton(listItem){
    const deleteButton = document.createElement('p'); 
    deleteButton.className = 'button'; 
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => { 
        listItem.remove(); 
    });
    return deleteButton;
}
function addEditButton(listItem){
    const editButton =document.createElement('p');
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


            listItem.className = 'list'; 
           

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
        // Add tasks back to the list (similar to code in addButton event listener) 
        const listItem = document.createElement('li'); 
        listItem.className = 'list-container'; 
        const taskText = document.createElement('div'); 
        taskText.className = 'task-text'; 
        taskText.innerText = task; 
        const buttonContainer = document.createElement('div'); 
        buttonContainer.className = 'button-container'; 
        buttonContainer.appendChild(addEditButton(listItem)); 
        buttonContainer.appendChild(addDeleteButton(listItem)); 
        listItem.className = 'list'; listItem.appendChild(taskText); 
        listItem.appendChild(buttonContainer); myList.appendChild(listItem);
    }); 
}


//call the loadtasksFromlocalstorage funtion whenever the page refreshes
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);