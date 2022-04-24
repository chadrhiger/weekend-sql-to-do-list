$(document).ready(function(){
  console.log('jQuery sourced.');
    refreshTasks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $(document).on('click', '.completeBtn', handleCompleteBtn);
  $(document).on('click', '.deleteBtn', handleDeleteBtn);
}


function handleSubmit() {
  console.log('Submit button clicked.');
  let task = {
    description: $('#taskInput').val()
};
  addTask(task);
}

// adds a book to the database
function addTask(taskToAdd) {
  $('#taskInput').val('');
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshTasks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Cannot add Task, please try later.');
    });
}

// refreshTasks will get all tasks from the server and render to page
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks'
  }).then(function(response) {
    console.log(response);
    renderTasks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of tasks to the DOM
function renderTasks(tasks) {
  $('#tasksOut').empty();
  for(let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
      console.log('this is what happens when you log "task" in renderTasks', task);
    $('#tasksOut').append(`
    <tr data-id=${task.id}><td>${task.description}</td><td><button class="completeBtn">DONE!</button></td>
    <td><button class="deleteBtn">Delete</button></td></tr>
    `);
  }
}

function handleCompleteBtn(){
  console.log('"DONE!" clicks, bruh.');
  let taskToComplete = $(this).closest('tr').data('id');
  console.log(taskToComplete);
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskToComplete}`,
    data: {complete: true}
  }).then(function(response){
    refreshTasks();
    // if ()
  }).catch(function(error){
    console.log(error);
  })
}

function handleDeleteBtn(){
  console.log('handleDeleteBtn is clicked');
  let taskIdToDelete = $(this).closest('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskIdToDelete}`
  }).then(function(response) {
    refreshTasks();
  }).catch(function(error) {
    console.log(error);
  })
}

