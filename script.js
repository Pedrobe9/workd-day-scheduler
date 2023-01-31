$(document).ready(function(){

  // Reference to DOM elements
  let currentDayEl = $('#currentDay');
  let containerDiv = $("div:first");
  //Make save button with class .saveBtn
  let saveBtn;
  // Array to store in LocalStorage
  let todos = [];
  containerDiv.addClass('time-block')

  let currentDate = moment().format("dddd, MMMM Do");
  currentDayEl.text(currentDate);

  // time using moment.js
  let time = moment().format("hh A");
  let time24 = moment().format("H");

  function drawRow(timeSlotText) {
    // .description determines how text is wrapped in text area
    let inputArea = $('<textarea cols="40" class="description">');
    let inputNote = inputArea.val();
    //console.log("inputArea: ", inputArea);
    //console.log("inputNote: ", inputArea.val());
    // Time slot creation
    let timeSlot = $('<p class="hour">');
    timeSlot.text(timeSlotText);

    //Color of textarea changes with time
    let currentClass;

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
    inputArea.addClass(currentClass);

    //Make save button with class .saveBtn
    //saveBtn = $('<button type="button" class="saveBtn"><i class="fa-solid fa-floppy-disk"></i></button>');
    saveBtn = $('<i class="fas fa-save saveBtn"></i>');
    saveBtn.attr('data-index', 'slot' + timeCompSlot);
    // construct the row 
    let tableRow = $('<div class="row">');
    tableRow.append(timeSlot, inputArea, saveBtn);
    containerDiv.append(tableRow);
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      todos = storedTodos;
    }
    console.log("$('.time-block'):", $('.time-block'));
    console.log("containerDiv'):", containerDiv);
  }

  //Store data in localStore
  function storeData(event) {
    //event.preventDefault();
    console.log("element: storeData before");
    var element = event.target;
    console.log("event.target:", event.target);
    // If that element is a button...
    if (element.matches("button") === true) {
      // Identify which slot was clicked
      var index = element.attr('data-index');
      console.log("element: ", element);
      // Store updated data in localStorage, check if previous data
      todos = window.localStorage.getItem('todos');
      plannerData = JSON.parse(todos);
      // Get inputNote into array to store
      console.log("ok");
      var todo = {index:inputNote};
      todos.push(todo);
      // Stringify and set data key in localStorage to an array
      window.localStorage.setItem("todos", JSON.stringify(todos));


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
  console.log("element: bclick");
  saveBtn.on("click", storeData());
  

  /*saveBtn.on("click", function(event) {
  //event.preventDefault();
  console.log("element: storeData before");
  var element = event.target;
  // If that element is a button...
  if (element.matches("button") === true) {
    // Identify which slot was clicked
    var index = element.attr('data-index');
    console.log("element: ", element);
    // Store updated data in localStorage, check if previous data
    todos = window.localStorage.getItem('todos');
    plannerData = JSON.parse(todos);
    // Get inputNote into array to store
    console.log("ok");
    var todo = {index:inputNote};
    todos.push(todo);
    // Stringify and set data key in localStorage to an array
    window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  });*/

});