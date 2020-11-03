hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', 
'1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total' ];
var Cities = []
function City(name, minHourCustomer, maxHourCustomer,averageCookies, saleArray, total) {
    this.name = name;
    this.minHourCustomer = minHourCustomer;
    this.maxHourCustomer = maxHourCustomer;
    this.averageCookies = averageCookies;
    this.saleArray = saleArray;
    this.total = total;

    Cities.push(this);
}

var seattle = new City('Seattle', 23, 65, 6.3, [], 0);

var tokyo = new City('Tokyo', 3, 24, 1.2, [], 0);

var dubai = new City('Dubai', 11, 38, 3.7, [], 0);

var paris = new City('Paris', 20, 38, 2.3, [], 0);

var lima = new City('Lima', 2, 16, 4.6, [], 0);




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
