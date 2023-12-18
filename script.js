// Ralph Godkin
// Lesson 06 - To Do App

console.log("JS is running");

const newTodoFrm = document.querySelector('#listItemFrm');          // Select the form from the DOM
const todoList = document.getElementById('todoList');               // The full ul toDo list

newTodoFrm.addEventListener('submit', function(event){              // Add listener for submit btn to add a new to-do item
    event.preventDefault();
    let newListItem = document.getElementById('toDo').value;            
    if (newListItem != '' || newListItem != undefined){
        addListItem(newListItem);                                   // Call the function to create Li item
        newTodoFrm.reset();                                         // Reset the form
        }  // ENF if...
    else {return;}
    })  // END event listener

// Create function to add a new todo item to the list
function addListItem(item) {
    const newDoneBtn = document.createElement('button');            // Create new done button
    newDoneBtn.innerText = ('Mark Done');
    newDoneBtn.setAttribute ('class', 'done');

    const newDelBtn = document.createElement('button');            // Create new delete button
    newDelBtn.innerText = ('Delete');
    newDelBtn.setAttribute ('class', 'delete');

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');                 // Create new Li
    newSpan.innerText = `${item} `;
    newLi.append(newSpan);
    newLi.prepend(newDoneBtn);                                      // Add the button to the new Li
    newLi.append(newDelBtn);                                        // Add the button to the new Li

    todoList.appendChild(newLi);                                    // Add the new item to the list
    saveList();                                                     // Save list to local storage
    }   // END addListItem()


// Function to complete or delete a List Item
function doneDel() {
    todoList.addEventListener('click', function(event) {
        const btnClkd = event.target.classList.contains('done') ? 'done' : 'delete';   // Identify which button was clicked
        if (btnClkd === 'delete') {
            event.target.parentElement.remove();
            saveList();
            }
        else {
            event.target.parentElement.setAttribute("class", "completed");      // Set strikethrough class on Li
            } 
        }  // END event function  
        );  // END EventListener
}  // END doneDel() function


// Function to save the list to Local Storage
function saveList() {
    console.log('saveList() is running.');
        let listArray = [];
        
    const listItems = document.getElementsByTagName('span');      // Get the Li's in the span (so as to exclude the buttons)

    // Loop through the list items and put them in an array
    for (let i = 0; i < listItems.length; i++) {
        listArray.push(listItems[i].innerText);
        } // END for loop

    const JSONlist = JSON.stringify(listArray);
    console.log(`JSON list of the to-do array: ${JSONlist}`);
    localStorage.setItem('Stored list', JSONlist);
}   // END saveList() function


// Function to retrieve & display the data from Local Storage
function savedItems() {
    const storedItems = JSON.parse(localStorage.getItem('Stored list'));
    console.log(`items retrieved from local storage: ${storedItems}`)
    if (storedItems !== 'undefined' || storedItems !== 0) {
        for (let item of storedItems){
            addListItem(item);
    }}  // END for loop  &  END if...
}   // END savedItems()

// Call the functions
savedItems();
doneDel();
