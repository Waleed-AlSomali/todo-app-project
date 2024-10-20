let todolist = [];

const setTasksToLocalStorage = (data) => {

    localStorage.setItem('todolist', JSON.stringify(data));
}

const getTasksFromLocalStorage = (key) => {

   return JSON.parse(localStorage.getItem(key));
}

const taskElement = document.getElementById('task');
const formElement = document.getElementById('task-form');
const taskListElement = document.getElementById('taskList');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const newtask = {
        
        id: Date.now() + Math.random(),
        ongoingtask: taskElement.value,
    };
        todolist.push(newtask); 
       
        setTasksToLocalStorage(todolist);
        formElement.reset();
        renderTasks();
});

const deleteTaskbyId = (id) => {

   const filteredTasks = todolist.filter((task) => task.id !== id );
   console.log('Task is deleted');
    setTasksToLocalStorage(filteredTasks);
    renderTasks();
}

const updateTaskbyId = (task) => {
    taskElement.value = task.ongoingtask;
    
};

const renderTasks = () => {

    
todolist = getTasksFromLocalStorage('todolist');
taskListElement.innerHTML = '';
todolist.map((task) => {

    const taskDivElement = document.createElement('div');

    taskDivElement.textContent =  `${task.ongoingtask}`;
    taskDivElement.classList.add('task')

    
    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = `Delete`;
    taskDeleteButton.addEventListener('click', () => deleteTaskbyId(task.id));

    taskDivElement.appendChild(taskDeleteButton);

    const taskEditButton = document.createElement('button');
    taskEditButton.textContent = `Edit`;
    taskEditButton.addEventListener('click', () => updateTaskbyId(task));

    taskDivElement.appendChild(taskEditButton);


   
    taskListElement.appendChild(taskDivElement); 
});

};

document.addEventListener('DOMContentLoaded', () => {
   
});

 
