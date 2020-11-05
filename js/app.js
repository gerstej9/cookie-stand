hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Location Total' ];
hoursStaff = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm' ];
percentMaxCustomer = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7,
0.5, 0.3, 0.4]
var Cities = []
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

var seattle = new City('Seattle', 23, 65, 6.3, [], 0);

var tokyo = new City('Tokyo', 3, 24, 1.2, [], 0);

var dubai = new City('Dubai', 11, 38, 3.7, [], 0);

var paris = new City('Paris', 20, 38, 2.3, [], 0);

var lima = new City('Lima', 2, 16, 4.6, [], 0);


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
    this.staffArray = []
    for(var i = 0; i<hours.length-1; i++){
        actualCustomers = Math.ceil(percentMaxCustomer[i]*this.hourlyCustomers[i]);
        var staffNeeded = Math.ceil(actualCustomers/20)
        var totalCookies = Math.floor(actualCustomers * this.averageCookies);
        this.saleArray.push(totalCookies);
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

City.prototype.masterSales = function(){
    this.randomInt(this.minHourCustomer, this.maxHourCustomer);
    this.hourSales(this, this.averageCookies);
    this.totalSales(this);
}

var generateAll = function(citiesArray){
    for(var i = 0; i < citiesArray.length; i++){
        citiesArray[i].randomInt();
        citiesArray[i].hourSales();
        citiesArray[i].totalSales();
        //console.log(citiesArray[i]);
    }
}

generateAll(Cities);




// City.prototype.render = function(id){
//         for(var i = 0; i<hours.length-1; i++){
//             var salesParent = document.getElementById(id);
//             //console.log(salesParent);
//             var liElement = document.createElement('li')
//             liElement.textContent = hours[i] + ': ' + this.saleArray[i] + ' cookies';
//             salesParent.appendChild(liElement);
//         }
//         var salesParent = document.getElementById(id);
//         //console.log(salesParent);
//         var liElement = document.createElement('li')
//         liElement.textContent = hours[hours.length-1] + ': ' + this.total + ' cookies';
//         salesParent.appendChild(liElement);
// }

var tableBodySales = document.getElementById('table');
var tableBodyStaff = document.getElementById('staff');

function makeHeader(tableId){
    var tableRowHead = document.createElement('tr');
    tableId.appendChild(tableRowHead);
    var thHead = document.createElement('th');
    tableRowHead.appendChild(thHead);
    console.log(tableId);
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
City.prototype.renderTBody = function(tableId){
    var tableRowData = document.createElement('tr');
    tableId.appendChild(tableRowData);
    var tdRow = document.createElement('td');
    tdRow.textContent = this.name;
    tableRowData.appendChild(tdRow);
    if(tableId == tableBodySales){
        array = this.saleArray;
        total = this.total;
    }
    if(tableId == tableBodyStaff){
        array = this.staffArray;
        total = ''
    }
    for(var i = 0; i < hours.length-1; i++){
        var tdRow = document.createElement('td');
        tdRow.textContent = array[i];
        tableRowData.appendChild(tdRow);
    }
    var tdRow = document.createElement('td');
    tdRow.textContent = total;
    tableRowData.appendChild(tdRow);
}

function makeFooter(tableId){
    var tableRowFoot = document.createElement('tr');
    tableId.appendChild(tableRowFoot);
    var thFoot = document.createElement('th');
    thFoot.textContent = ('Totals');
    tableRowFoot.appendChild(thFoot);
    for(var i = 0; i < hours.length-1; i++){
        var hourlyTotalLocations = 0;
            for(var j = 0; j < Cities.length; j++){
                hourlyTotalLocations += Cities[j].saleArray[i];
            }
        var thFoot = document.createElement('th');
        thFoot.textContent = (hourlyTotalLocations);
        tableRowFoot.appendChild(thFoot);
    }
    var thFoot = document.createElement('th');
    dailyTotalAll = 0;
    for (var i = 0; i < Cities.length; i++){
        dailyTotalAll+= Cities[i].total;
    }
    thFoot.textContent = (dailyTotalAll);
    tableRowFoot.appendChild(thFoot);
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
        var thFoot = document.createElement('th');
        thFoot.textContent = (hourlyStaffLocations);
        tableRowFoot.appendChild(thFoot);
    }
    var thFoot = document.createElement('th');
    tableRowFoot.appendChild(thFoot);
}

makeHeader(tableBodySales);
seattle.renderTBody(tableBodySales);
tokyo.renderTBody(tableBodySales);
dubai.renderTBody(tableBodySales);
paris.renderTBody(tableBodySales);
lima.renderTBody(tableBodySales);
makeFooter(tableBodySales);

makeHeader(tableBodyStaff);
seattle.renderTBody(tableBodyStaff);
tokyo.renderTBody(tableBodyStaff);
dubai.renderTBody(tableBodyStaff);
paris.renderTBody(tableBodyStaff);
lima.renderTBody(tableBodyStaff);
makeFooterStaff();

//     liAdd: function (city, id){
//         for(var i = 0; i<hours.length-1; i++){
//             var salesParent = document.getElementById(id);
//             //console.log(salesParent);
//             var liElement = document.createElement('li')
//             liElement.textContent = hours[i] + ': ' + city.saleArray[i] + ' cookies';
//             salesParent.appendChild(liElement);
//         }
//         var salesParent = document.getElementById(id);
//         //console.log(salesParent);
//         var liElement = document.createElement('li')
//         liElement.textContent = hours[hours.length-1] + ': ' + city.total + ' cookies';
//         salesParent.appendChild(liElement);
//     }

// }

