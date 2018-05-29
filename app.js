// Seleting elements
const addForm = document.querySelector('#inputform');
const todolist = document.querySelector('#todolist-wrapper');
const clearDone = document.querySelector('.clear-done');
const input = addForm.querySelector('input');
const SingleList = document.querySelector('.task-single-list');
// States
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// events

// create the list when the page load
createList()

function addTodo(e)
{
	e.preventDefault();
	
	todos.push({
		task: input.value,
		done: false
	})
	localStorage.setItem('todos', JSON.stringify(todos))
	createList()
	input.value = ''
}
function deleteTodo(e)
{
	if(!e.target.matches('button.delete')) return;

	if( !confirm('Sure to delete?') ) return;

	todos.splice(e.target.dataset.index, 1);
	localStorage.setItem('todos', JSON.stringify(todos))
	createList();
}
function doneTodo(e)
{
	if(!e.target.matches('button.make-done')) return;

	todos[e.target.dataset.index].done = true;
	localStorage.setItem('todos', JSON.stringify(todos))
	createList()
}
function unDoneTodo(e)
{
	if(!e.target.matches('button.make-undone')) return;

	todos[e.target.dataset.index].done = false;
	localStorage.setItem('todos', JSON.stringify(todos))
	createList()
}
function clearDoneTodos(e)
{

	if( !confirm('Are you sure?') ) return; 

	// we need to filter all undone todos
	const doneTodos = todos.filter( todo => !todo.done )
	// replace all todos with undone todos
	todos = doneTodos;
	createList();
	localStorage.setItem('todos', JSON.stringify(todos))
}
function editTodo(e)
{
	if(!e.target.matches('button.edit')) return;
	const updatedTask = prompt('Your Task', todos[e.target.dataset.index].task);

	if(updatedTask)
		todos[e.target.dataset.index].task = updatedTask

	createList()
	localStorage.setItem('todos', JSON.stringify(todos))
}
addForm.addEventListener('submit' , addTodo);
todolist.addEventListener('click' , deleteTodo);
todolist.addEventListener('click' , doneTodo);
todolist.addEventListener('click' , unDoneTodo);
todolist.addEventListener('click' , editTodo);
clearDone.addEventListener('click' , clearDoneTodos);

function createList()
{
	todolist.innerHTML = todos.map( (todo , i) => `
		<li class="list-group-item" 
			ondblclick="this.classList.add('editing')"
			onkeydown="event.preventDefault(); if(event.keyCode == 13) this.classList.remove('editing');"
		>
			<form class="list-form">
				<input type="text" class="todo-edit-input" value="${todo.task}"/>
			</form>             
			<div class="list-content">
				<span class="task ${ (todo.done) ? 'task--done' : '' }">${todo.task}</span>
				<div class="todo-app--actions">
				    <button class="delete" data-index="${i}">✕</button>
				    
					${ (!todo.done) ? `<button data-index="${i}" class="edit">✎</button>` : '' }
					${ (!todo.done) ? `<button class="make-done" data-index="${i}">✓</button>` : '' }
					${ (todo.done) ? `<button class="make-undone" data-index="${i}">↩︎</button>` : '' }

				</div> 
			</div>
		</li>
	` ).join('');
	if( !todos.filter( todo => todo.done ).length )
		clearDone.style.visibility = 'hidden'
	else
		clearDone.style.visibility = 'visible'

}