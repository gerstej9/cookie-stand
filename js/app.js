hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total' ];
var seattle = {
    minHourCustomer: 23,
    maxHourCustomer: 65,
    averageCookies: 6.3,
    saleArray:[],
    total: 0,
}

var tokyo = {
    minHourCustomer: 3,
    maxHourCustomer: 24,
    averageCookies: 1.2,
    saleArray: [],
    total: 0,
}

var dubai = {
    minHourCustomer: 11,
    maxHourCustomer: 38,
    averageCookies: 3.7,
    saleArray: [],
    total: 0,
}

var paris = {
    minHourCustomer: 20,
    maxHourCustomer: 38,
    averageCookies: 2.3,
    saleArray: [],
    total: 0,
}

var lima = {
    minHourCustomer: 2,
    maxHourCustomer: 16,
    averageCookies: 4.6,
    saleArray: [],
    total: 0,
}





//console.log(seattle.randomInt(seattle.minHourCustomer, seattle.maxHourCustomer));

var cityCookiesMethods = {
    randomInt: function getRandomIntInclusive(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
    },
    // saleArray: [],

    hourSales: function(city, averageCookies){
        for(var i = 0; i<hours.length-1; i++){
            var customer = cityCookiesMethods.randomInt(city.minHourCustomer, city.maxHourCustomer);
            var totalCookies = Math.floor(customer * city.averageCookies);
            city.saleArray.push(totalCookies);
        }
    },

    totalSales: function(city){
        for(var i = 0; i<hours.length-1; i++){
            city.total = city.total+ city.saleArray[i];
        }
        return city.total
    },


    liAdd: function (city, id){
        for(var i = 0; i<hours.length-1; i++){
            var salesParent = document.getElementById(id);
            //console.log(salesParent);
            var liElement = document.createElement('li')
            liElement.textContent = hours[i] + ': ' + city.saleArray[i] + ' cookies';
            salesParent.appendChild(liElement);
        }
        var salesParent = document.getElementById(id);
        //console.log(salesParent);
        var liElement = document.createElement('li')
        liElement.textContent = hours[hours.length-1] + ': ' + city.total + ' cookies';
        salesParent.appendChild(liElement);
    },

}


var cityCookies = function(city, cityCookiesMethods, id){
cityCookiesMethods.randomInt(city.minHourCustomer, city.maxHourCustomer);
cityCookiesMethods.hourSales(city, city.averageCookies);
cityCookiesMethods.totalSales(city, city.total);
cityCookiesMethods.liAdd(city,id);
};
cityCookies(seattle, cityCookiesMethods, 'seattle');
cityCookies(tokyo, cityCookiesMethods, 'tokyo');
cityCookies(dubai, cityCookiesMethods, 'dubai');
cityCookies(paris, cityCookiesMethods, 'paris');
cityCookies(lima, cityCookiesMethods, 'lima');
