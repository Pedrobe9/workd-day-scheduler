// Reference to DOM elements
let currentDayEl = $('#currentDay');



let currentDate = moment().format("dddd, MMMM Do");
currentDayEl.text(currentDate);