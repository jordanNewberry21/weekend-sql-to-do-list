$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is loaded.');
    getTaskList();
}

function getTaskList() { // ajax GET function
    $.ajax({
        type:'GET',
        url: '/task'
    }).then(function (response) {
        console.log(response);
        renderTaskList(response); // call render with response from server
    }).catch(function (error) {
        console.log('error in GET route', error);
    })
}

function renderTaskList(tasks) {
    // empty landing spot on refresh to avoid double-posting data
    $('#taskSpot').empty();

    // loop through table from DB
    for (let task of tasks) {
        let $tr = $(`<tr data-id=${task.id}></tr>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td><button class="btn btn-primary completeTaskBtn">Completed</button></td>`);
        $tr.append(`<td><button class="btn btn-danger deleteTaskBtn">Remove</button></td>`);
        $('#taskSpot').append($tr);
    }
}