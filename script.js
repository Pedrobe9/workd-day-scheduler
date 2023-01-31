$(document).ready(function(){

  // Reference to DOM elements
  let currentDayEl = $('#currentDay');
  let containerDiv = $("div:first");
  //Make save button with class .saveBtn
  let saveBtn;
  containerDiv.addClass('time-block')

  let currentDate = moment().format("dddd, MMMM Do");
  currentDayEl.text(currentDate);

  // time using moment.js
  let time = moment().format("hh A");
  let time24 = moment().format("H");

  function drawRow(timeSlotText) {
    // .description determines how text is wrapped in text area
    let inputNote = $('<textarea rows="2" cols="40" class="description">');
    // Time slot creation
    let timeSlot = $('<p class="hour">');
    timeSlot.text(timeSlotText);

    //Color of textarea changes with time
    console.log(time);
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
    console.log("color", timeCompSlot, time24);
    console.log("color", timeCompSlot < time24);
    if (timeCompSlot < time24) {
        currentClass = "past";
    } else if (timeCompSlot == time24) {
        currentClass = "present";
    } else {
        currentClass = "future";
    }
    inputNote.addClass(currentClass);
    //Make save button with class .saveBtn
    saveBtn = $('<i class="saveBtn fa-solid fa-floppy-disk"></i>');
    // construct the row 
    let tableRow = $('<div class="row">');
    tableRow.append(timeSlot, inputNote, saveBtn);
    containerDiv.append(tableRow);
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
      console.log("check:", timeSlotText, time);
      console.log("check:", typeof(timeSlotText), typeof(time));
      console.log("check:", timeSlotText === time);
  }



/*/ Borders of table and position
let tableFrame = $('td');
tableFrame.css({"height":"50px", "border":"1px solid black", "padding":"15px"});
tableRowsSection.parent().css({"display":"flex", "justify-content":"center"});
tableRowsSection.css({"justify-content":"center"});

// Dimension of central column
$('.c2').css("width", "400px");
// Right column color
$('.c3').css("background-color", "#82d4ef");
$('.c3 a').css({"color":"white", "background-color":"#82d4ef"});
$("#r1c1").text()
let time = moment().format("H A");
let timeSlot = ["#r1c1", "#r2c1", "#r3c1", "#r4c1", "#r5c1", "#r6c1", "#r7c1", "#r8c1", "#r9c1"];
let textSlot = ["#r1c2", "#r2c2", "#r3c2", "#r4c2", "#r5c2", "#r6c2", "#r7c2", "#r8c2", "#r9c2"];
console.log($("#r3c1").text());
console.log(time);

// Color of central column
$('.c2').css("background-color", "rgba(46, 240, 8, 0.5)");
for (let i = 0; i < 8; i++) {
    if ($(timeSlot[i]).text() == time) {
        console.log($(timeSlot[i]).text() == time);
        $(textSlot[i]).css("background-color", "rgba(250, 0, 0, 0.5)");
        //$(textSlot[i]).prevAll().css("background-color", "rgba(250, 0, 0, 0.5)");
        for (let j = 0; j < i; j++) {
          $(textSlot[j]).css("background-color", "rgba(20, 20, 20, 0.3)");
        }
    }  
}*/






});