let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks")

// Empty array to store the tasks
let arrayOfTasks = [];

//Check if theres tasks in local stroge
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//Trigger get data form local stroge function 
getDataFromLocalStroge();

//Add task 
submit.onclick = function () {
    if(input.value !== "") {
        addTaskToArray(input.value); //Add task to array of tasks
        input.value = "";
    }

};

//Click in task elment 
tasksDiv.addEventListener("click" , (e) => {
    //Delete button
    if(e.target.classList.contains("del")) {
        //Remove task from locael stroge 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove element from page 
        e.target.parentElement.remove();
    }
    // Toggle complate for task 
    toggleStatusWith(e.target.getAttribute("data-id"));

    // Task element 
    if(e.target.classList.contains("task")){
        // Toggel done class
        e.target.classList.toggle("done");
    }       
});

function addTaskToArray (taskText){
    //Tasks data 
    const task = {
        id: Date.now(),
        title : taskText ,
        completed : false
    };
    //push tasks to array of tasks 
    arrayOfTasks.push(task)
    // Add task to page 
    addElementsToPageFrom(arrayOfTasks);
    //Add task to local stroge
    addTaskToLocalStroge(arrayOfTasks);
    //For testing
    console.log(arrayOfTasks);
    console.log(JSON.stringify(arrayOfTasks));
}


function addElementsToPageFrom(arrayOfTasks){
    //Empty tasks div
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        //Create main div 
        let div = document.createElement("div");
        div.className = "task";

        //Check if task done 
        if(task.complated){
            div.className = "done";
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));

        //Create delete buttion
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        //Append button to main div 
        div.appendChild(span);
        
        //Add task to tasks container 
        tasksDiv.appendChild(div);
    });
}

// Function to add tasks to local stroge 
function addTaskToLocalStroge(arrayOfTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStroge(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){

    // for explain only 
    // for(let i = 0; i < arrayOfTasks.length; i++ ){
    //     console.log(`${arrayOfTasks[0].id}`);
    // }

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTaskToLocalStroge(arrayOfTasks);
}

function toggleStatusWith(taskId){
    for(let i = 0; i < arrayOfTasks.length; i++ ) {
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed == true) :  (arrayOfTasks[i].completed == false) ; 
        }
    }

    addTaskToLocalStroge(arrayOfTasks);
}

