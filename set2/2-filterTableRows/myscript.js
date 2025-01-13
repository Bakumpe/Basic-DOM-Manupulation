function addOnList() {
    // Function to add a delete button to a table row
    function addDeleteButton(row) {
        const deleteButton = document.createElement('p'); 
        deleteButton.className = 'button'; 
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => { 
            row.remove(); 
            updateLocalStorage(); // Update local storage after deletion
            console.log('Row deleted:', row); // Debug log
        });
        return deleteButton;
    }

    // Function to add an edit button to a table row
    function addEditButton(row) {
        const editButton = document.createElement('p');
        editButton.className = 'button';
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            const cells = row.querySelectorAll('td');
            const name = prompt('Edit Name:', cells[0].innerText);
            const age = prompt('Edit Age:', cells[1].innerText);
            const sex = prompt('Edit Sex:', cells[2].innerText);

            if (name) cells[0].innerText = name;
            if (age) cells[1].innerText = age;
            if (sex) cells[2].innerText = sex;
            
            updateLocalStorage(); // Update local storage after editing
            console.log('Row edited:', row); // Debug log
        });
        return editButton;
    }

    // Function to add a task to the table and local storage
    function addTask() {
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const sexInput = document.getElementById('sex');
        const addButton = document.getElementById('addButton');
        const myTable = document.querySelector('#myTable tbody');

        if (!nameInput || !ageInput || !sexInput || !addButton || !myTable) {
            console.error('Required elements not found');
            return;
        }

        addButton.addEventListener('click', () => {
            const name = nameInput.value;
            const age = ageInput.value;
            const sex = sexInput.value;

            if (name && age && sex) {
                const row = document.createElement('tr');
                row.className = 'list-container';

                const nameCell = document.createElement('td');
                nameCell.innerText = name;

                const ageCell = document.createElement('td');
                ageCell.innerText = age;

                const sexCell = document.createElement('td');
                sexCell.innerText = sex;

                const buttonCell = document.createElement('td');
                buttonCell.className = 'button-container';
                buttonCell.appendChild(addEditButton(row));
                buttonCell.appendChild(addDeleteButton(row));

                row.appendChild(nameCell);
                row.appendChild(ageCell);
                row.appendChild(sexCell);
                row.appendChild(buttonCell);
                myTable.appendChild(row);

                addTaskToLocalStorage({ name, age, sex });

                nameInput.value = '';
                ageInput.value = '';
                sexInput.value = '';

                console.log('Task added:', { name, age, sex }); // Debug log
            }
        });

        loadTasksFromLocalStorage();
    }

    // Function to add a task to local storage
    function addTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('MyTasks')) || [];
        tasks.push(task);
        localStorage.setItem('MyTasks', JSON.stringify(tasks));
        console.log('Task saved to localStorage:', task); // Debug log
    }

    // Function to update local storage after deletion or editing
    function updateLocalStorage() {
        const myTable = document.querySelector('#myTable tbody');
        const rows = myTable.querySelectorAll('tr');
        const tasks = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                tasks.push({
                    name: cells[0].innerText,
                    age: cells[1].innerText,
                    sex: cells[2].innerText
                });
            }
        });
        localStorage.setItem('MyTasks', JSON.stringify(tasks));
        console.log('LocalStorage updated:', tasks); // Debug log
    }

    // Function to load tasks from local storage when the page refreshes
    function loadTasksFromLocalStorage() {
        const myTable = document.querySelector('#myTable tbody');
        let tasks = JSON.parse(localStorage.getItem('MyTasks')) || [];
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.className = 'list-container';

            const nameCell = document.createElement('td');
            nameCell.innerText = task.name;

            const ageCell = document.createElement('td');
            ageCell.innerText = task.age;

            const sexCell = document.createElement('td');
            sexCell.innerText = task.sex;

            const buttonCell = document.createElement('td');
            buttonCell.className = 'button-container';
            buttonCell.appendChild(addEditButton(row));
            buttonCell.appendChild(addDeleteButton(row));

            row.appendChild(nameCell);
            row.appendChild(ageCell);
            row.appendChild(sexCell);
            row.appendChild(buttonCell);
            myTable.appendChild(row);

            console.log('Task loaded from localStorage:', task); // Debug log
        });
    }

    document.addEventListener('DOMContentLoaded', () => { 
        loadTasksFromLocalStorage(); 
        addTask(); // Call addTask function here 
        searchMe();
    });
}
addOnList();

function filterTable() { 
    let input, filter, table, tr, td, i, txtValue; //Declare variables

    input = document.getElementById("myInput"); 
    filter = input.value.toUpperCase(); 
    table = document.getElementById("myTable"); 
    tr = table.getElementsByTagName("tr"); 

    //Loop through the elements and find the searched item
    for (i = 1; i < tr.length; i++) { 
        tr[i].style.display = "none"; 
        td = tr[i].getElementsByTagName("td"); 
        for (var j = 0; j < td.length; j++) { 
            if (td[j]) { 
                txtValue = td[j].textContent || td[j].innerText; 
                if (txtValue.toUpperCase().indexOf(filter) > -1) { 
                    tr[i].style.display = ""; 
                    break; 
                } 
            } 
        } 
    } 
}
filterTable();