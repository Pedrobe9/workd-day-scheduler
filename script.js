$(document).ready(function(){

  // Reference to DOM elements
  let currentDayEl = $('#currentDay');
  let containerDiv = $("div:first");
  // Global variables
  let saveBtn;
  var inputArea;
  var index;
  var indexId;
  // Array to store in LocalStorage
  var todos = [];

  // time using moment.js
  let currentDate = moment().format("dddd, MMMM Do");
  currentDayEl.text(currentDate);
  let date = moment().format("DD-MM-YYYY");
  let time24 = moment().format("H");

  //function to display the rows making the scheduler
  function drawRow(timeSlotText) {
    //Color of textarea changes with time
    let currentClass;

     // Time slot creation
    let timeSlot = $('<p class="hour">');
    timeSlot.text(timeSlotText);

    // Work out time for comparison using time24.
    let timeCompSlot;
    if (timeSlot.text().includes('AM')) {
      timeCompSlot = parseInt(timeSlot.text().slice(0, 2));
    } else if (timeSlot.text() == '12 PM') {
      timeCompSlot = 12;
    } else {
      timeCompSlot = parseInt(timeSlot.text().slice(0, 2)) + 12;
    }

    if (timeCompSlot < time24) {
        currentClass = "past";
    } else if (timeCompSlot == time24) {
        currentClass = "present";
    } else {
        currentClass = "future";
    }

    // .description determines how text is wrapped in text area
    inputArea = $('<textarea cols="40" class="description">');
    //inputNote = inputArea.val();

    inputArea.attr('id', 'slot' + timeCompSlot);
    //console.log("inputNote: ", inputArea.val());
    inputArea.addClass(currentClass);

    console.log("inputArea: ", inputArea);
    //Make save button with class .saveBtn
    //saveBtn = $('<button type="button" class="saveBtn"><i class="fa-solid fa-floppy-disk"></i></button>');
    saveBtn = $('<i class="fas fa-save saveBtn"></i>');
    saveBtn.attr('data-index', 'slot' + timeCompSlot);
    // construct the row 
    let tableRow = $('<div class="row">');
    tableRow.append(timeSlot, inputArea, saveBtn);
    containerDiv.append(tableRow);
    console.log("appendRow:", containerDiv);

    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      todos = storedTodos;
    }
  }

  //Store data in localStore
  function storeData(event) {
    var element = event.target;

    // If that element is a <i>...
    if (element.matches("I") === true) {
      // Identify which slot was clicked
      index = element.getAttribute('data-index');
      indexId = '#' + index;

      // Get inputNote into array to store
      var obj = {};
      obj[index] = $(indexId).val();
      obj.date = date;
      
      // Check if there is any information in storage, if it is null, create array
      todos = JSON.parse(localStorage.getItem('todos'));
      if (todos === null) {
      todos = [];
      }

      // Adding item searched to array if it is not already in it
      if (obj !== null && obj !== undefined) {
        todos.push(obj);
        // Stringify and store it
        localStorage.setItem('todos', JSON.stringify(todos));
  
      }
    }
  }
  

  // Draw the table calling function each hour
  let timeS;
  for (let i = 0; i < 9; i++) {
      timeS = i + 9;
      // Make time to have same format prepending 0 when needed
      if (timeS < 10) {
          timeSlotText = "0" + timeS + " AM";
      } else if (timeS >= 10 && timeS < 12) {
          timeSlotText = timeS + " AM";
      } else if (timeS > 12) {
          timeSlotText = "0" + (timeS - 12) + " PM";
      } else {
          timeSlotText = timeS + " PM";
      }
      drawRow(timeSlotText);
  }


  function dataInStore() {
    // Check if there is data in locaStore
    todos = window.localStorage.getItem('todos');
    todos = JSON.parse(todos);
    // If there is data, retrieve and display it on the scheduler
    if(todos) {
      //Loop through data and scheduler rows and match both
      for(let i = 0; i < todos.length; i++) {
        if(todos[i].date === date) {
          for(let j = 9; j < 18; j++) {
            // Display data in right row of scheduler
            if(todos[i]['slot' + j]) {
              $('#slot' + j).val(todos[i]['slot' + j]);
            }
          }
        }
      }
    }
  }
  dataInStore();

  containerDiv.on("click", storeData);

});