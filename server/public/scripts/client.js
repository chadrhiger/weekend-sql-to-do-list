$(document).ready(function () {
  console.log('jQuery sourced.');
  refreshTasks();
  addClickHandlers();
});

// Click listeners
function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $(document).on('click', '#completeBtn', handleCompleteBtn);
  $(document).on('click', '#deleteBtn', handleDeleteBtn);
} // end

// Responds to SUBMIT click by creating new object that includes the value entered into taskInput
function handleSubmit() {
  console.log('Submit button clicked.');
  let newTask = {
    description: $('#taskInput').val()
  };
  let empt = $('#taskInput').val();
  if (empt === ""){
    alert("please enter a task");
    return false;
  }
  else {
    addTask(newTask);
  }
  
} // end

// Adds a task to the database
function addTask(taskToAdd) {
  $('#taskInput').val('');
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskToAdd,
  }).then(function (response) {
    console.log('Response from server.', response);
    refreshTasks();
  }).catch(function (error) {
    console.log('Error in POST', error)
    alert('Cannot add Task, please try later.');
  });
} // end

// refreshTasks will get all tasks from the server and render to page
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks'
  }).then(function (response) {
    console.log(response);
    renderTasks(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
} // end


// Displays an array of tasks to the DOM
function renderTasks(tasks) {
  $('#tasksOut').empty();
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    console.log('this is what happens when you log "task" in renderTasks', task);
    if (task.complete === false) {
      $('#tasksOut').append(`
    <tr class="item" data-id=${task.id}>
      <td>${task.description}</td>
      <td><button id="completeBtn">Done?</button></td>
      <td><button id="deleteBtn">Delete</button></td>
    </tr>
    `);
    }
    else {
      $('#tasksOut').append(`
      <tr class="item" data-id=${task.id}><td>${task.description}</td>
        <td><button class="doneness" id="completeBtn">DONE!</button></td>
        <td><button id="deleteBtn">Delete</button></td>
      </tr>
      `);
    }
  }
} // end renderTasks

function handleCompleteBtn() {
  console.log('"DONE!" clicks, bruh.');
  let taskToUpdate = $(this).closest('tr').data('id');
  console.log(taskToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskToUpdate}`,
    data: { complete: true }
  }).then(function (response) {
    refreshTasks();
  }).catch(function (error) {
    console.log(error);
  })
} // end handleCompleteBtn

// Responds to DELETE button by locating the ID on the .closest table row and 
// sending it to the delete function in the router
function handleDeleteBtn() {
  console.log('handleDeleteBtn is clicked');
  let taskIdToDelete = $(this).closest('tr').data('id');
  console.log('the ID of the row just deleted is:', taskIdToDelete);
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskIdToDelete}`
  }).then(function (response) {
    refreshTasks();
  }).catch(function (error) {
    console.log(error);
  })
} // end handleDeleteBtn

