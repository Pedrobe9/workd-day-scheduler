
// Reference to DOM elements
let currentDayEl = $('#currentDay');
let containerDiv = $("div:first");


let currentDate = moment().format("dddd, MMMM Do");
currentDayEl.text(currentDate);

// create table rows
// create div and attach  to containerDiv
let tableRowsSection = $('<table>');
containerDiv.append(tableRowsSection);
// create table rows
let tableRow1 = $('<tr><td id="r1c1" class="c1">9 AM</td><td id="r1c2" class="c2"></td><td id="r1c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow1);
let tableRow2 = $('<tr><td id="r2c1" class="c1">10 AM</td><td id="r2c2" class="c2"></td><td id="r2c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow2);
let tableRow3 = $('<tr><td id="r3c1" class="c1">11 AM</td><td id="r3c2" class="c2"></td><td id="r3c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow3);
let tableRow4 = $('<tr><td id="r4c1" class="c1">12 AM</td><td id="r4c2" class="c2"></td><td id="r4c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow4);
let tableRow5 = $('<tr><td id="r5c1" class="c1">1 PM</td><td id="r5c2" class="c2"></td><td id="r5c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow5);
let tableRow6 = $('<tr><td id="r6c1" class="c1">2 PM</td><td id="r6c2" class="c2"></td><td id="r6c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow6);
let tableRow7 = $('<tr><td id="r7c1" class="c1">3 PM</td><td id="r7c2" class="c2"></td><td id="r7c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow7);
let tableRow8 = $('<tr><td id="r8c1" class="c1">4 PM</td><td id="r8c2" class="c2"></td><td id="r8c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow8);
let tableRow9 = $('<tr><td id="r9c1" class="c1">5 PM</td><td id="r9c2" class="c2"></td><td id="r9c3" class="c3"><a href="#"><i class="fa-solid fa-floppy-disk"></i></a></td></tr>');
tableRowsSection.append(tableRow9);

let tableFrame = $('td');
tableFrame.css({"height":"50px", "border":"1px solid black", "padding":"15px"});
$('.c2').css("width", "400px");
$('.c3').css("background-color", "#82d4ef");
$('.c3 a').css({"color":"white", "background-color":"#82d4ef"});
tableRowsSection.parent().css({"display":"flex", "justify-content":"center"});
tableRowsSection.css({"justify-content":"center"});


function printTable() {


}


