

const clear = document.querySelector('.clear');

const dateElement = document.getElementById('date');

const list = document.getElementById('list');

const input = document.getElementById('input');

const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUCH = 'lineThrough';

// Variables ==

let LIST, id;

let data = localStorage.getItem('TODO');

if(data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
}
else{

	LIST = [];
	id = 0;
}

const loadList = (array) => {

	array.forEach(function(item) {

		addToDo(item.name, item.id, item.done, item.trash);

	});

}

clear.addEventListener('click', function(){
	localStorage.clear();
	location.reload();
});


// add date
const options = {weekday: 'long', month: 'short', day: 'numeric'}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);


// add to do function
const addToDo = (toDo, id, done, trash)=> {

if(trash){
	return;	
}

const DONE = done ? CHECK : UNCHECK;
const LINE = done ?  LINE_THROUCH : "";

const text = `
				<li class='item'>

				<i class= 'fa ${DONE} co' job='complete' id='${id}'></i>
				<p class='text ${LINE}'> ${toDo} </p>
				<i class='fa fa-trash de' job='delete' id='${id}'></i>
				<li>
		`;


const position = 'beforeend';

list.insertAdjacentHTML(position, text); 


}

// add an item to the list using the enter key

document.addEventListener('keyup',function(event){

	if(event.keyCode == 13) {
		const toDo = input.value;

		if(toDo){
			addToDo(toDo, id, false, false);

			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false
			});

			//add items to local storage
		localStorage.setItem('TODO', JSON.stringify(LIST));

		id++;

		}
		input.value = '';
	}


});
 
 // complete to do;

 const completeToDo = (element) => {
 	
 	element.classList.toggle(CHECK);
 	element.classList.toggle(UNCHECK);
 	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUCH);

 	LIST[element.id].done = LIST[element.id].done ? false : true;

 }


 // remove to do

 const removeToDo = (element) => {

 	element.parentNode.parentNode.removeChild(element.parentNode);

 	LIST[element.id].trash = true;

 }


 // target teh items created dynamically;


 list.addEventListener('click', function(event){
 	const element = event.target;
 	const elementJob = element.attributes.job.value;

 	if(elementJob == 'complete') {
 		completeToDo(element);
 	}else if (elementJob == 'delete') {
 		removeToDo(element);
 	}

 	//add items to local storage
localStorage.setItem('TODO', JSON.stringify(LIST));

 });


//