$(document).ready(function(){
  console.log('jQuery sourced.');
    refreshTasks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $(document).on('click', '.completeBtn', handleCompleteBtn);
  // $(document).on('click', '.deleteBtn', handleDeleteBtn);
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
  console.log('"DONE!" works, bruh.');
  let taskToComplete = $(this).closest('tr').data('id');
  // console.log(taskToComplete);
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskToComplete}`,
    data: {complete: true}
  }).then(function(response){
    refreshTasks();
  }).catch(function(error){
    console.log(error);
  })
}

// function updateSong() {
//   console.log('update works! dolphin!!!')
//   let songIdToUpdate = $(this).closest('tr').data('id');
//   let currentRank = $(this).closest('tr').data('rank');
//   let newRank = currentRank - 1;
//   $.ajax({
//     method: 'PUT',
//     url: `/songs/${songIdToUpdate}`,
//     data: { newRank: newRank }
//   }).then(function(response) {
//     getSongs();
//   }).catch(function(error) {
//     console.log(error);
//   })
// }

// function handleDeleteBtn(){

// }
























// console.log('JS linked');

// $(document).ready(function(){
//   console.log('jQ has entered the chat.');
//   // refreshTasks();
//   clickListeners()();
// });

// function clickListeners() {
//   console.log('in clickListeners clicked');
// // $('#addTaskBtn').on('click', addTask);
// }
  



// // adds a tasks to the database
// function addTask() {
//   let taskToAdd = {
//     task: $('#taskInput').val()
//   }
//   $.ajax({
//     type: 'POST',
//     url: '/tasks',
//     data: taskToAdd,
//     }).then(function(response) {
//       console.log('Response from server.', response);
//       refreshTasks();
//     }).catch(function(error) {
//       console.log('Error in POST', error)
//       alert('Post fucked up, bud.');
//     });
// }

// // refreshTasks will get all tasks from the server and render to page
// // function refreshTasks() {
// //   $.ajax({
// //     type: 'GET',
// //     url: '/tasks'
// //   }).then(function(response) {
// //     console.log(response);
// //     renderTasks(response);
// //   }).catch(function(error){
// //     console.log('yr GET sucks, dood.', error);
// //   });
// // }


// // Displays an array of tasks to the DOM
// // function renderTasks(tasks) {
// //   $('#tasksOut').empty();

// //   for(let i = 0; i < tasks.length; i += 1) {
// //     let task = tasks[i];
// //     // For each book, append a new row to our table
// //     $('#tasksOut').append(`
// //       <tr>
// //         <td>${book.title}</td>
// //         <td>${book.author}</td>
// //       </tr>
// //     `);
// //   }
// // }











// // function getTasks() {
// //   $.ajax({
// //     type: 'GET',
// //     url: '/tasks'
// //   }).then(function (response) {
// //     let el = $('#tasksOut');
// //     el.empty();
// //     for (let i = 0; i < response.length; i++) {
// //       el.append(`<li>${response[i].size} ${response[i].color} ${response[i].name}
// //             <button class="sellButton" data-id="${response[i].id}">Sell</button>
// //             <button class="togglePendingButton" data-id="${response[i].id}"
// //             data-pending="${response[i].pending}">Pending: ${response[i].pending}</button></li>`)
// //     } //end for
// //   }).catch(function (err) {
// //     alert('Error getting inventory:', err);
// //   })
// // } // end getTasks()


