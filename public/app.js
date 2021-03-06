// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//===========

//==================
//display date

// const filterOption = document.querySelector('.filter-todo')

// Events listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// checkBtn.addEventListener('click', checkStyle);	

// filterOption.addEventListener('click', filterTodo);

//Funtions

function addTodo (event) {
	//prevent form form submitting
	event.preventDefault();
	//  create to do div == todo Div

	const todoWrapper = document.createElement('div');
	todoWrapper.classList.add('todoWrap');

	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");	 

	//check mark btn == check btn

	const completedButton = document.createElement('input'); 
	completedButton.type = 'checkbox';
	// completedButton.innerHTML = '<i class= "fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);


	// create li

	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	// trash button 
	const trashButton = document.createElement('button'); 
	trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);


	// Add todo to local storage 
	saveLocalTodos(todoInput.value);

	//append to list 
	todoList.appendChild(todoDiv);

	//clear todo input value
	todoInput.value='';
	
}

//background color of chech btn when clicked
// document.querySelector('.complete-btn').addEventListener('click', function() {

// 	console.log('man');

// })



function deleteCheck(e) {
	const item = e.target;

	//delete todo
	if(item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		// rodo.remove();
		//animation
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function() {
			todo.remove();
		});
			// todo.remove();
	}

	// check marker
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');

	}
}

// function filterTodo(e) {
// 	const todos = todoList.childNodes;
	// const todo = item.parentElement;
	// console.log(todos);
// 	todos.forEach(function(todo){
// 		switch(e.target.value ){
// 			case 'all':
// 			break;
// 			case 'completed' :
// 			if(todo.classList.contains('co'))
// 		}
// 	})
// }



function saveLocalTodos(todo){

	//check local storage

	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else {
		todos = JSON.parse(localStorage.getItem('todos')); 
	}

	todos.push(todo);	
	localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
	
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else {
		todos = JSON.parse(localStorage.getItem('todos')); 
	}

	// todos.push(todo);	

	localStorage.setItem('todos', JSON.stringify(todos));	

	todos.forEach(function(todo){

		//  create to do div == todo Div

	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");	 

		//check mark btn == check btn

	const completedButton = document.createElement('input'); 
	completedButton.type = 'checkbox';
	// completedButton.innerHTML = '<i class= "fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);


	// create li

	const newTodo = document.createElement('li');
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	// trash button 
		const trashButton = document.createElement('button'); 
	trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);


	//append to list 
	todoList.appendChild(todoDiv);


	});
}

function removeLocalTodos(todo) {
	 //check local storage

	 let todos;
	 if (localStorage.getItem('todos') === null) {
	 	todos = [];
	 }else{
	 	todos = JSON.parse(localStorage.getItem('todos'));
	 }

	 const todoIndex = todo.children[0].innerText;
	 todos.splice(todos.indexOf(todoIndex), 1);
	 localStorage.setItem('todos', JSON.stringify(todos));
	 
}

const options = {weekday : 'long', month:'short', day:'numeric'};
const showDate = document.querySelector('#date');
const today = new Date();
showDate.innerHTML = today.toLocaleDateString('en-US', options);

