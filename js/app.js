//Global Variables

hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Location Total' ];

hoursStaff = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm' ];

percentMaxCustomer = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7,
0.5, 0.3, 0.4]

var Cities = []

var tableBodySales = document.getElementById('table');

var tableBodyStaff = document.getElementById('staff');

//Constructor Function

function City(name, minHourCustomer, maxHourCustomer,averageCookies, hourlyCustomers, saleArray, total, staffArray) {
    this.name = name;
    this.minHourCustomer = minHourCustomer;
    this.maxHourCustomer = maxHourCustomer;
    this.averageCookies = averageCookies;
    this.hourlyCustomers = hourlyCustomers;
    this.saleArray = saleArray;
    this.total = total;
    this.staffArray = staffArray;

    Cities.push(this);
}

//Prototypes

City.prototype.randomInt = function (){
    for(var i = 0; i < hours.length-1; i++){
        var customerPerHour = Math.floor(Math.random() * (this.maxHourCustomer - this.minHourCustomer + 1) + this.minHourCustomer);
        this.hourlyCustomers.push(customerPerHour);
    }
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//Function taken from above URL and MDN web docs

City.prototype.hourSales = function(){
    this.saleArray = []
    for(var i = 0; i<hours.length-1; i++){
        actualCustomers = Math.ceil(percentMaxCustomer[i]*this.hourlyCustomers[i]);
        var totalCookies = Math.ceil(actualCustomers * this.averageCookies);
        this.saleArray.push(totalCookies);
    }
}

City.prototype.staffNeeded = function(){
    this.staffArray = []
    for(var i = 0; i<hours.length-1; i++){
        actualCustomers = Math.ceil(percentMaxCustomer[i]*this.hourlyCustomers[i]);
        var staffNeeded = Math.ceil(actualCustomers/20)
        this.staffArray.push(staffNeeded);
    }
}

City.prototype.totalSales = function(){
    this.total = 0
    for(var i = 0; i<hours.length-1; i++){
        this.total += this.saleArray[i];
    }
    return this.total
}

City.prototype.renderTBody = function(tableId){
    var tableRowData = document.createElement('tr');
    tableId.appendChild(tableRowData);
    var tdRow = document.createElement('td');
    tdRow.textContent = this.name;
    tableRowData.appendChild(tdRow);
    if(tableId == tableBodySales){
        array = this.saleArray;
        total = this.total;
        for(var i = 0; i < hours.length-1; i++){
            tdRow = document.createElement('td');
            tdRow.textContent = array[i];
            tableRowData.appendChild(tdRow);
        }
        tdRow = document.createElement('td');
        tdRow.textContent = total;
        tableRowData.appendChild(tdRow);
    }
    if(tableId == tableBodyStaff){
        array = this.staffArray;
        for(var i = 0; i < hoursStaff.length; i++){
            tdRow = document.createElement('td');
            tdRow.textContent = array[i];
            tableRowData.appendChild(tdRow);
        }
    }
}

//Invocations

new City('Seattle', 23, 65, 6.3, [], 0);
new City('Tokyo', 3, 24, 1.2, [], 0);
new City('Dubai', 11, 38, 3.7, [], 0);
new City('Paris', 20, 38, 2.3, [], 0);
new City('Lima', 2, 16, 4.6, [], 0);


//Helper Functions

var generateAll = function(citiesArray){
    for(var i = 0; i < citiesArray.length; i++){
        citiesArray[i].randomInt();
        citiesArray[i].hourSales();
        citiesArray[i].staffNeeded();
        citiesArray[i].totalSales();
    }
}


function makeHeader(tableId){
    var tableRowHead = document.createElement('tr');
    tableId.appendChild(tableRowHead);
    var thHead = document.createElement('th');
    tableRowHead.appendChild(thHead);
    if(tableId == tableBodySales){
        array = this.saleArray;
        total = this.total;
        hoursArray = hours        
    }
    if(tableId == tableBodyStaff){
        array = this.staffArray;
        total = '';
        hoursArray = hoursStaff;
        
    }
    for(var i = 0; i < hoursArray.length; i++){
        thHead = document.createElement('th');
        thHead.textContent = hoursArray[i];
        tableRowHead.appendChild(thHead);
    }

}

function makeFooter(tableId){
    var tableRowFoot = document.createElement('tr');
    tableId.appendChild(tableRowFoot);
    var thFoot = document.createElement('th');
    thFoot.textContent = ('Totals');
    tableRowFoot.appendChild(thFoot);
    for(var i = 0; i < hours.length-1; i++){
        var hourlyTotalLocations = 0;
        if(tableId == tableBodySales){
            for(var j = 0; j < Cities.length; j++){
                hourlyTotalLocations += Cities[j].saleArray[i];
            }
        }
        if(tableId == tableBodyStaff){
            for(var j = 0; j < Cities.length; j++){
                hourlyTotalLocations += Cities[j].staffArray[i];
            }
        }
        thFoot = document.createElement('th');
        thFoot.textContent = (hourlyTotalLocations);
        tableRowFoot.appendChild(thFoot);
    }
    if(tableId == tableBodySales){
        thFoot = document.createElement('th');
        dailyTotalAll = 0;
        for (var i = 0; i < Cities.length; i++){
            dailyTotalAll+= Cities[i].total;
        }
        thFoot.textContent = (dailyTotalAll);
        tableRowFoot.appendChild(thFoot);
    }
}
function makeFooterStaff(){
    var tableRowFoot = document.createElement('tr');
    tableBodyStaff.appendChild(tableRowFoot);
    var thFoot = document.createElement('th');
    thFoot.textContent = ('Totals');
    tableRowFoot.appendChild(thFoot);
    for(var i = 0; i < hours.length-1; i++){
        var hourlyStaffLocations = 0;
            for(var j = 0; j < Cities.length; j++){
                hourlyStaffLocations += Cities[j].staffArray[i];
            }
        thFoot = document.createElement('th');
        thFoot.textContent = (hourlyStaffLocations);
        tableRowFoot.appendChild(thFoot);
    }
}

function main(){

    makeHeader(tableBodySales);

    for (i = 0; i < Cities.length; i++){
        Cities[i].renderTBody(tableBodySales);
    }
    
    makeFooter(tableBodySales);

    makeHeader(tableBodyStaff);

    for (i = 0; i < Cities.length; i++){
        Cities[i].renderTBody(tableBodyStaff);
        }

    makeFooter(tableBodyStaff);
}

// Event Handlers 
function addLocation(event){
    event.preventDefault();
    if (event.target.location.value == '' || event.target.minHourCustomer.value == '' || event.target.maxHourCustomer.value == '' || 
    event.target.averageCookie.value == ''){
    }else{
        console.log(event.target.minHourCustomerlvalue)
    var newStore = new City(event.target.location.value, parseInt(event.target.minHourCustomer.value), parseInt(event.target.maxHourCustomer.value), 
    parseInt(event.target.averageCookie.value), [], 0);
    generateAll(Cities);
    tableBodySales.innerHTML = '';
    tableBodyStaff.innerHTML = '';
    main();
}
}

//Executable Code

generateAll(Cities);
main();





//Event Listeners
var formEl = document.getElementById("form");
formEl.addEventListener('submit', addLocation);