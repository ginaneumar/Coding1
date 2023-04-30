function addTodo() {
	const todoInput = document.getElementById('todo-input');
	const todoList = document.getElementById('todo-list');
	const todoText = todoInput.value.trim(); //entfernt unnötige Leerzeichen
	if (todoText !== '') { // überprüft ob eingabe leer ist 
		const li = document.createElement('li'); //erstellt listenelement
		li.innerText = todoText; // Element bekommt eingabe
		li.onclick = function() {
			if (li.classList.contains('done')) {  //überprüft Zustand
				li.classList.remove('done'); //strich entfernen 
			} else {
				li.classList.add('done'); // durchstreichen
			}
		};
		todoList.appendChild(li); //fügt liste hinzu
		todoInput.value = ''; //eingabefeld leeren nach eingabe
	}
}
