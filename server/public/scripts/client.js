$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is loaded.');
    $('#submitTaskBtn').on('click', handleSubmit);
    $('#taskSpot').on('click', '.completeTaskBtn', completeTask);
    $('#taskSpot').on('click', '.deleteTaskBtn', deleteTask);
    getTaskList();
}

function completeTask() {
    console.log('in complete task button');
}

function deleteTask() {
    console.log('in delete task button');
}

function handleSubmit(event) {
    event.preventDefault();
    console.log('in submit task button');
    let task = {
        task: $('#taskString').val(),
        task_completed: false
    }; // creating new task object
    // task.task = $('#taskString').val();
    // task.task_completed = false;

    addToTaskList(task);
}

function addToTaskList(taskToAdd) {
    console.log('checking out my task....', taskToAdd);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: taskToAdd
    }).then(function (response) {
        console.log('response from server', response);
        getTaskList();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
      });
}

function getTaskList() { // ajax GET function
    $.ajax({
        method:'GET',
        url: '/task'
    }).then(function (response) {
        console.log(response);
        renderTaskList(response); // call render with response from server
    }).catch(function (error) {
        console.log('error in GET route', error);
    })
}

function renderTaskList(tasks) {
    // empty landing spot on function call to avoid double-posting data
    $('#taskSpot').empty();

    // loop through table from DB
    for (let task of tasks) {
        let $tr = $(`<tr data-id=${task.id}></tr>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td><button class="btn btn-primary completeTaskBtn">Completed</button></td>`);
        $tr.append(`<td><button class="btn btn-danger deleteTaskBtn">Remove</button></td>`);
        $('#taskSpot').append($tr);
    }
    // this method of appending seemed a little confusing at first
    // but I think after actually writing it this way it feels much cleaner
}