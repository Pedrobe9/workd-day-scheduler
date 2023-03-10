$(document).ready(function(){

  // Reference to DOM elements
  let currentDayEl = $('#currentDay');
  let containerDiv = $("div:first");
  //Make save button with class .saveBtn
  let saveBtn;
  var inputArea;
  var index;
  var indexId;
  // Array to store in LocalStorage
  var todos = [];
  //containerDiv.addClass('time-block')

  let currentDate = moment().format("dddd, MMMM Do");
  currentDayEl.text(currentDate);

  // time using moment.js
  let date = moment().format("DD-MM-YYYY");
  let time24 = moment().format("H");

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
    //console.log("$('.time-block'):", $('.time-block'));
    //console.log("containerDiv'):", containerDiv);
    //console.log("inputNote-drawrows:", inputNote);
  }

  //Store data in localStore
  function storeData(event) {
    console.log("element: click before event.target");
    var element = event.target;
    console.log("event.target:", event.target);
    // If that element is a <i>...
    if (element.matches("I") === true) {
      // Identify which slot was clicked
      index = element.getAttribute('data-index');
      indexId = '#' + index;
      console.log("indexId: ", indexId);
      // Get inputNote into array to store
      console.log("$(indexId).val():", $(indexId).val());
      var obj = {};
      obj[index] = $(indexId).val();
      obj.date = date;
      
      // Check if there is any information in storage, if it is null, create array
      todos = JSON.parse(localStorage.getItem('todos'));
      if (todos === null) {
      todos = [];
      }
      console.log("todo:", obj, "todos:", todos);
      // Adding item searched to array if it is not already in it
      if (obj !== null && obj !== undefined) {
        todos.push(obj);
        // Stringify and store it
        localStorage.setItem('todos', JSON.stringify(todos));
  
      }


    }
    /*//event.preventDefault();
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
    }*/
    
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
  //saveBtn.on("click", storeData());

  function dataInStore() {
    todos = window.localStorage.getItem('todos');
    todos = JSON.parse(todos);
    let keys = ['slot9', 'slot10', 'slot11', 'slot12', 'slot13', 'slot14', 'slot15', 'slot16', 'slot17']
    console.log("dataInStore-midle1-todos:", todos);
    if(todos) {
      console.log("todos[0].date", todos[0].date);
      for(let i = 0; i < todos.length; i++) {
        if(todos[i].date === date) {
          for(let j = 9; j < 18; j++) {
            console.log("dataInStore-midle2", todos[i]['slot' + j]);
            $('#slot' + j).val(todos[i]['slot' + j]);
          }

        
          //console.log(todos[i][index], "---", $(indexId), "-----", $(indexId).val(todos[i][index]));
        
        //As seen in https://api.jquery.com/jquery.each/   (jQuery.each(array, callback))
        /*jQuery.each('textarea', function(txtA) {
          let txtArea = $('textarea')[txtA];
          console.log("dataInStore-midle3", txtArea, "tid:", txtArea.getAttribute('id'));
          $('#' + txtArea.getAttribute('id')).val(todos[txtArea.getAttribute('id')]);
          console.log("dataInStore-end");
        })*/
        }
      }

    }
  }
  dataInStore();

  containerDiv.on("click", storeData);/*function(event) {
  //event.preventDefault();
  console.log("element: click before event.target");
  var element = event.target;
  // If that element is a <i>...
  if (element.matches("I") === true) {
    // Identify which slot was clicked
    var index = element.getAttribute('data-index');
    var indexId = '#' + index;
    console.log("indexId: ", indexId);
    // Get inputNote into array to store
    console.log("$(indexId).val():", $(indexId).val());
    var todo = {index:$(indexId).val()};
    todos.push(todo);
    // Stringify and set data key in localStorage to an array
    window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  });*/

});