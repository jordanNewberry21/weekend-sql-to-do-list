$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is loaded.');
    $('#submitTaskBtn').on('click', handleSubmit); // click handlers
    $('#taskSpot').on('click', '.completeTaskBtn', completeTask);
    $('#taskSpot').on('click', '.deleteTaskBtn', deleteTask);
    $('#taskSpot').on('click', '.updateTaskTextBtn', editTaskMode);
    getTaskList(); // getting data table on page load
}

function completeTask(event) {
    event.preventDefault();

    let taskId = $(this).closest('tr').data('id'); // targeting the data id from table row
    console.log(`in complete task button, changing complete status for task#: ${taskId}`);
    $.ajax({
        method: 'PUT',
        url: `/task/${taskId}` // setting the url for the PUT route to match up with the unique taskId
    }).then(function (response) {
        getTaskList(); // calling function to GET data again
    }).catch(function (error) {
        console.log('Error...', error);
        alert('Something went wrong. Please try again.');
    });
}

function deleteTask() {
    let taskId = $(this).closest('tr').data('id'); // targeting the data id from table row
    console.log(`in delete task button, deleting task#: ${taskId}`);
    Swal.fire({
        title: 'Did you finish this task?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Yes`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Task Removed!', '', 'success')
            $.ajax({
                method: 'DELETE',
                url: `/task/${taskId}` // setting the url for the DELETE route to match up with the unique taskId
            }).then(function (response) {
                getTaskList(); // calling function to GET data again
            }).catch(function (error) {
                console.log('Error...', error);
                alert('Something went wrong. Please try again.');
            });
        } else if (result.isDenied) {
            Swal.fire('That\'s okay', '', 'info')
        }
    });
   
}

function handleSubmit(event) {
    event.preventDefault();
    console.log('in submit task button');
    let task = { // creating new task object with default value of false for task_completed
        task: $('#taskString').val(),
        task_completed: false
    };

    addToTaskList(task); // sending new task to server via ajax
}

function addToTaskList(taskToAdd) {
    console.log('checking out my task....', taskToAdd);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: taskToAdd // sending new task data object to the server to be added to the DB
    }).then(function (response) {
        $('#taskString').val('');
        console.log('response from server', response);
        getTaskList(); // getting new data from server
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
}

function getTaskList() { // ajax GET function
    $.ajax({
        method: 'GET',
        url: '/task' // setting the url for data transactions
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
        $tr.data('task', task);
        $tr.append(`<td id="taskText">${task.task}</td>`);
        $tr.append(`<td><button id=${task.id} class="btn btn-sm btn-primary completeTaskBtn" data-complete=${task.task_completed}>Completed</button></td>`);
        $tr.append(`<td><button class="btn btn-sm btn-danger deleteTaskBtn">Remove</button></td>`);
        $tr.append(`<td><button class="btn btn-sm btn-success updateTaskTextBtn">Edit</button></td>`);
        $('#taskSpot').append($tr);
        if (task.task_completed === true) { // conditional specific to each task
            $tr.addClass('background_OVERRIDE'); // adds a green class to the table row to show a complete status
            $(`#${task.id}`).attr('disabled', true); // disables completeTaskBtn for tasks that are complete
        }
    }
    // this method of appending seemed a little confusing at first
    // but I think after actually writing it this way it feels much cleaner
    // that being said I think it is a little trickier to visualize how things are being appended
    // when doing it this way. I ran into a little trouble trying to change the background color
    // and disabling the button.
}