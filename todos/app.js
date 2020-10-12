
//select the elements
const btnSubmit = document.querySelector('#btn_submit');
const ul       = document.querySelector("ul");

//localStorage key
const todoKey   = 'todoList';

//load the todo list
let todos   = getLocalStorage();
for (let todo of todos){
    addItem(todo);
}

//add todo list event
btnSubmit.addEventListener('click' , function (e){
    e.preventDefault();

    //get the todo task
    const txtTodo  = document.querySelector('#txt_todo');
    let todo    = txtTodo.value;

    //add to the list
    addItem({text : todo , completed: false});

    //empty the textbox
    txtTodo.value = '';
});

//complete and remove todo list event
ul.addEventListener('click' , function(e){
    const target    = e.target;
    if (target.tagName === 'BUTTON'){
        //task item
        const liItem    = target.parentElement;
        if (target.className == 'btn-complete'){
            const span  = liItem.querySelector('span');

            if (target.innerText == 'Complete'){
                //complete the task
                span.classList.add('task-completed');
                target.innerText    = 'Incomplete';
            } else {
                //make the task imcomplete
                span.classList.remove('task-completed');
                target.innerText    = 'Complete';

            }

        } else if (target.className == 'btn-remove'){
            //remove the task
            liItem.remove();
        }

        //store to localStorage
        setLocalStorage();
    }
});


/**
 * add item to the todo list
 * @param {*} todo 
 */
function addItem(todo){
    const newItem  = document.createElement('li');
    //add text
    const newSpan  = document.createElement('span');
    newSpan.innerText   = todo.text;
    if (todo.completed == true){
        newSpan.classList.add('task-completed');
    }
    newItem.append(newSpan);

    //complete button
    const btnComplete   = document.createElement('button');
    btnComplete.innerText   = todo.completed ? 'Incomplete' : 'Complete';
    btnComplete.className   = 'btn-complete';
    newItem.append(btnComplete);

    //remove button
    const btnRemove     = document.createElement('button');
    btnRemove.innerText     = 'Remove';
    btnRemove.className     = 'btn-remove';
    newItem.append(btnRemove);

    //add to the list
    ul.append(newItem);

    //storage to localStorage
    setLocalStorage();
}


/**
 * store data to localStorage
 */
function setLocalStorage(){
    const lis   = ul.querySelectorAll('li');
    let todos    = [];
    for (let li of lis){
        const span  = li.querySelector('span');
        let todo    = {text: span.innerText , completed: span.classList.contains('task-completed')};
        todos.push(todo);
    }

    localStorage.setItem(todoKey , JSON.stringify(todos));
}

/**
 * get data from localStorage
 */
function getLocalStorage(){
    let todos   = localStorage.getItem(todoKey);
    if (todos){
        return JSON.parse(todos);
    }
    return [];
}