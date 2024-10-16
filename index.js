let todolist = [];

const resetForm = () => {

    taskElement.value = '';

}

const setTasksToLocalStorage = (data) => {

    localStorage.setItem('todolist', JSON.stringify(data));
}

const getTasksFromLocalStorage = (key) => {

   return JSON.parse(localStorage.getItem(key));
}

const taskElement = document.getElementById('task');
const formElement = document.getElementById('task-form');
const taskListElement = document.getElementById('taskList');

formElement.addEventListener('submit', (Event) => {
    Event.preventDefault();
    const newtask = {
        
        id: Date.now() + Math.random(),
        ongoingtask: taskElement.value,
    };
        todolist.push(newtask); 
       
        setTasksToLocalStorage(todolist);
        resetForm();
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

    const TaskDivElement = document.createElement('div');

    TaskDivElement.textContent =  `${task.ongoingtask}`;
    TaskDivElement.classList.add('task')

    
    const TaskDeleteButton = document.createElement('button');
    TaskDeleteButton.textContent = `Delete`;
    TaskDeleteButton.addEventListener('click', () => deleteTaskbyId(task.id));

    TaskDivElement.appendChild(TaskDeleteButton);

    const TaskEditButton = document.createElement('button');
    TaskEditButton.textContent = `Edit`;
    TaskEditButton.addEventListener('click', () => updateTaskbyId(task));

    TaskDivElement.appendChild(TaskEditButton);


   
    taskListElement.appendChild(TaskDivElement); 
});

};

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

 
