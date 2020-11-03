hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total' ];
var Cities = []
function City(name, minHourCustomer, maxHourCustomer,averageCookies, hourlyCustomers, saleArray, total) {
    this.name = name;
    this.minHourCustomer = minHourCustomer;
    this.maxHourCustomer = maxHourCustomer;
    this.averageCookies = averageCookies;
    this.hourlyCustomers = hourlyCustomers;
    this.saleArray = saleArray;
    this.total = total;

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
    for(var i = 0; i<hours.length-1; i++){
        var totalCookies = Math.floor(this.hourlyCustomers[i] * this.averageCookies);
        this.saleArray.push(totalCookies);
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

var tableBody = document.getElementById('table');

function makeHeader(){
    var tableRowHead = document.createElement('tr');
    tableBody.appendChild(tableRowHead);
    var thHead = document.createElement('th');
    tableRowHead.appendChild(thHead);
    for(var i = 0; i < hours.length; i++){
        thHead = document.createElement('th');
        thHead.textContent = hours[i];
        tableRowHead.appendChild(thHead);
    }

}
City.prototype.renderTBody = function(){
    var tableRowData = document.createElement('tr');
    tableBody.appendChild(tableRowData);
    var tdRow = document.createElement('td');
    tdRow.textContent = this.name;
    tableRowData.appendChild(tdRow);
    for(var i = 0; i < hours.length; i++){
        var tdRow = document.createElement('td');
        tdRow.textContent = this.saleArray[i];
        tableRowData.appendChild(tdRow);
    }

}



makeHeader();
seattle.renderTBody();
tokyo.renderTBody();
dubai.renderTBody();
paris.renderTBody();
lima.renderTBody();


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

