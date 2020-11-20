- [] INITIAL SETUP
    - [] FILE STRUCTURE
        - [] SERVER / PUBLIC FOLDERS
        - [] SERVER.JS | - [] INDEX.HTML
        - [] ROUTES FOLDER | - [] STYLES FOLDER / VENDORS FOLDER
        - [] TASKROUTER.JS | - [] STYLE.CSS     |  - [] JQUERY FILE
                             - [] BOOTSTRAP HERE? ---> OR HERE?



- [] HTML
    - [] Page title & header `Weekend To-Do List`
    - [] Input field for string of Task
    - [] create Task button
    - [] create table to list tasks
    - [] set up table to be appended with jQuery

- [] CSS
    - [] gonna use bootstrap
    - [] style table
    - [] style buttons & maybe input field
    - [] check out bootstrap modal alerts
    - [] probably gonna need some color classes

- [] SQL
    - [] create a db: `weekend-to-do-app`
    - [] create a `database.sql` file for relevant SQL queries (create table etc..)
    - [] install pg & set up `pool.js`

- [] SERVER
    - [] install express & create routers to connect db
    - [] inside of the router file(s) I need:
        - [] GET route to grab task list from DB
        - [] POST route to add Task to list in DB
        - [] DELETE route to remove a task from the list in DB
        - [] PUT route to change a task from needing to be done to complete

- [] CLIENT
    - [] source in jQuery
    - [] readyNow function
        - [] this is where I will put my click handlers for:
            - [] Task submit button
            - [] Task complete button
            - [] Task delete button
    - [] getTask function:
        - [] ajax GET route
        - [] after data grab from db call render function
        - [] call this function inside readyNow to load data on page start
    - [] Render function:
        - [] calls data array as parameter
        - [] array goes into a for loop
        - [] for loop appends the task data to my html table
            - [] this should also dynamically append to each task
                - [] a DELETE button
                - [] a COMPLETE button
    - [] handleTask? function:
        - [] connected to submit Task button
        - [] grabs the string from the task input field
        - [] store it in an object with two values:
            - [] the string task itself
            - [] and a default value of completed: false
         - [] call function to send task to the server
    - [] sendTaskToSever function:
        - [] ajax POST route
        - [] after POST is sent, clear the input field here
        - [] call getTask function again
    - [] Complete task function:
        - [] connected to complete task button
        - [] ajax PUT route
        - [] add sqlText to change status of task from completed: false to true
            - [] get task by id
        - [] after status is changed to true
            - [] container element should change background color from a dark color to green to visualize being complete
            - [] the complete task button should become inactive, and look crossed out or unusable
    - [] Delete task function:
        - [] connected to delete button
        - [] ajax DELETE route
            - [] target task by it's id
            - [] sqlText to remove it from the table
        - [] after task is delete call getTask function again