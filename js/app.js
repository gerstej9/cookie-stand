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

//console.log(Cities)

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
        //console.log(totalCookies);
        this.saleArray.push(totalCookies);
    }
}

City.prototype.totalSales = function(){
    this.total = 0
    for(var i = 0; i<hours.length-1; i++){
        //console.log(this.saleArray[i])
        this.total += this.saleArray[i];
    }
    return this.total
}
//console.log(City.totalSales(seattle));
City.prototype.masterSales = function(){
    this.randomInt(this.minHourCustomer, this.maxHourCustomer);
    this.hourSales(this, this.averageCookies);
    this.totalSales(this);
}
//console.log(Cities[0].name)
//console.log(Cities[0].masterSales(), Cities[0].saleArray);

var generateAll = function(citiesArray){
    for(var i = 0; i < citiesArray.length; i++){
        citiesArray[i].randomInt();
        citiesArray[i].hourSales();
        citiesArray[i].totalSales();
        console.log(citiesArray[i]);
    }
    // citiesArray[i].masterSales();
    // console.log(citiesArray[i].name, citiesArray[i].saleArray, citiesArray[i].total);
}
//console.log(seattle.saleArray);
generateAll(Cities);
// seattle.masterSales();
// console.log(seattle.saleArray, seattle.total);
//console.log(City.masterSales(seattle));

// var cityCookiesMethods = {
//     randomInt: function getRandomIntInclusive(min, max){
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
//     },
//     // saleArray: [],

//     hourSales: function(city, averageCookies){
//         for(var i = 0; i<hours.length-1; i++){
//             var customer = cityCookiesMethods.randomInt(city.minHourCustomer, city.maxHourCustomer);
//             var totalCookies = Math.floor(customer * city.averageCookies);
//             city.saleArray.push(totalCookies);
//         }
//     },

//     totalSales: function(city){
//         for(var i = 0; i<hours.length-1; i++){
//             city.total = city.total+ city.saleArray[i];
//         }
//         return city.total
//     },


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
//     },

// }


// var cityCookies = function(city, cityCookiesMethods, id){
// cityCookiesMethods.randomInt(city.minHourCustomer, city.maxHourCustomer);
// cityCookiesMethods.hourSales(city, city.averageCookies);
// cityCookiesMethods.totalSales(city, city.total);
// cityCookiesMethods.liAdd(city,id);
// };
// cityCookies(seattle, cityCookiesMethods, 'seattle');
// cityCookies(tokyo, cityCookiesMethods, 'tokyo');
// cityCookies(dubai, cityCookiesMethods, 'dubai');
// cityCookies(paris, cityCookiesMethods, 'paris');
// cityCookies(lima, cityCookiesMethods, 'lima');
