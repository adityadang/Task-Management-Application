document.addEventListener('DOMContentLoaded', () => {
  const taskTitleInput = document.getElementById('task-title');
  const taskDescriptionInput = document.getElementById('task-description');
  const taskDueDateInput = document.getElementById('task-due-date');
  const addTaskBtn = document.getElementById('add-task-btn');
  const tasksUl = document.getElementById('tasks');
  const taskDetailsDiv = document.getElementById('task-details');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailDueDate = document.getElementById('detail-due-date');
  const editTaskBtn = document.getElementById('edit-task-btn');
  const closeDetailsBtn = document.getElementById('close-details-btn');
  
  let tasks = [];
  let currentTaskId = null;

  const renderTasks = () => {
    tasksUl.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.title}</span>
        <div>
          <button onclick="viewTask(${index})">View</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      tasksUl.appendChild(li);
    });
  };

  const addTask = () => {
    const task = {
      title: taskTitleInput.value,
      description: taskDescriptionInput.value,
      dueDate: taskDueDateInput.value,
    };
    if (currentTaskId !== null) {
      tasks[currentTaskId] = task;
      currentTaskId = null;
    } else {
      tasks.push(task);
    }
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskDueDateInput.value = '';
    renderTasks();
  };

  const viewTask = (index) => {
    const task = tasks[index];
    detailTitle.textContent = task.title;
    detailDescription.textContent = task.description;
    detailDueDate.textContent = new Date(task.dueDate).toLocaleDateString();
    taskDetailsDiv.style.display = 'flex';
    currentTaskId = index;
  };

  const editTask = () => {
    const task = tasks[currentTaskId];
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskDueDateInput.value = task.dueDate;
    taskDetailsDiv.style.display = 'none';
  };

  const closeDetails = () => {
    taskDetailsDiv.style.display = 'none';
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  addTaskBtn.addEventListener('click', addTask);
  editTaskBtn.addEventListener('click', editTask);
  closeDetailsBtn.addEventListener('click', closeDetails);

  window.viewTask = viewTask;
  window.deleteTask = deleteTask;
});
